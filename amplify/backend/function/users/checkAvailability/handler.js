// handlers/checkAvailability/handler.js
exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { username, email } = body;
    await mongoose.connect(process.env.MONGODB_URI);

    let usernameAvailable = true;
    let emailAvailable = true;

    if (username) {
      const userByUsername = await User.findOne({ username });
      if (userByUsername) usernameAvailable = false;
    }
    if (email) {
      const userByEmail = await User.findOne({ email });
      if (userByEmail) emailAvailable = false;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ usernameAvailable, emailAvailable })
    };
  } catch (error) {
    console.error('Availability check error:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Server error during availability check' }) };
  }
};
