const User = require('../models/User');
const History = require('../models/History');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

exports.addUser = async (req, res) => {
    
  try {
    const { name } = req.body;
    const existing = await User.findOne({ name });
    if (existing) return res.status(400).json({ message: 'User already exists' });
    console.log(existing);
    const user = new User({ name });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to add user' });
  }
};

exports.claimPoints = async (req, res) => {
  try {
    const { userId, points } = req.body;

    if (!points || points < 1 || points > 10) {
      return res.status(400).json({ message: 'Invalid points (must be 1-10)' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.totalPoints += points;
    await user.save();

    // Log the history
    const history = new History({
      userId,
      points,
      timestamp: new Date()
    });
    await history.save();

    // Emit leaderboard update via socket.io
    const io = req.app.get('io');
    const topUsers = await User.find().sort({ totalPoints: -1 }).limit(10);
    io.emit('leaderboardUpdate', topUsers);

    res.status(200).json({ message: 'Points claimed successfully', user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to claim points' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await History.find({ userId }).sort({ claimedAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
};
