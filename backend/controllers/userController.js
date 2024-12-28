const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      console.log("Missing Email or password.");
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Same Email exists.");
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const user = new User({ email, password, name });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(`Something Went Wrong: ${error}`);
    res.status(400).json({ error: error.message });
  }
};
