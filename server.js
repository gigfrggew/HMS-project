const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware for parsing JSON
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hostel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Define the schema and model
const userSchema = new mongoose.Schema({
    name: String,
    gender: String,
    hostel: String,
    loginTime: String,
    logoutTime: String
});

const User = mongoose.model('User', userSchema);

// Handle login form submissions
app.post('/login', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save(); // Use await for saving the user
        res.json({ success: true });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ success: false, message: 'Error saving user' });
    }
});

// Handle logout form submissions
app.post('/logout', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save(); // Use await for saving the user
        res.json({ success: true });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ success: false, message: 'Error saving user' });
    }
});

// Handle admin login
app.post('/admin-login', (req, res) => {
    const { adminUsername, adminPassword } = req.body;
    if (adminUsername === 'admin' && adminPassword === 'password') {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Handle viewing details
app.get('/view-details', async (req, res) => {
    try {
        const users = await User.find(); // Use await for querying users
        const logins = users.filter(user => user.loginTime);
        const logouts = users.filter(user => user.logoutTime);
        res.json({ success: true, logins, logouts });
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ success: false, message: 'Error retrieving users' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
