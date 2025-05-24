// handlers/registerUser/handler.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../../models/User');

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { email, username, password, paymentId, orderId, signature, ...otherFields } = body;

    await mongoose.connect(process.env.MONGODB_URI);

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Email or username already exists' }) };
    }

    const sign = orderId + '|' + paymentId;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (signature !== expectedSign) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Invalid payment signature' }) };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      ...otherFields,
      email,
      username,
      password: hashedPassword,
      paymentStatus: 'completed',
      paymentId
    });

    await user.save();

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Registration successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          status: user.status,
          hasLibraryAccess: user.hasLibraryAccess,
          libraryPaymentStatus: user.libraryPaymentStatus
        }
      })
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Server error during registration' }) };
  }
};

