const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/hostel', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    gender: String,
    hostel: String,
    loginTime: String,
    logoutTime: String
});

const User = mongoose.model('User', userSchema);

app.post('/login', (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err) => {
        if (err) {
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
});

app.post('/logout', (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err) => {
        if (err) {
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
});

app.post('/admin-login', (req, res) => {
    const { adminUsername, adminPassword } = req.body;
    if (adminUsername === 'admin' && adminPassword === 'password') {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/view-details', (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.json({ success: false });
        } else {
            const logins = users.filter(user => user.loginTime);
            const logouts = users.filter(user => user.logoutTime);
            res.json({ success: true, logins, logouts });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
