// handlers/loginUser/handler.js
const jwt = require('jsonwebtoken');
exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { username, password } = body;
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne({ username });
    if (!user) return { statusCode: 401, body: JSON.stringify({ message: 'Invalid username or password' }) };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { statusCode: 401, body: JSON.stringify({ message: 'Invalid username or password' }) };

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return {
      statusCode: 200,
      body: JSON.stringify({
        token,
        user: {
          id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          status: user.status,
          hasLibraryAccess: user.hasLibraryAccess,
          libraryPaymentStatus: user.libraryPaymentStatus
        }
      })
    };
  } catch (error) {
    console.error('Login error:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Server error' }) };
  }
};
