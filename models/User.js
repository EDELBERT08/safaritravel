const userSchema = new mongoose.Schema({
email: { type: String, required: true, unique: true },
password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);
const plain = req.body.password;
const hashed = await bcrypt.hash(plain, 10); // 10 salt rounds
// Save `hashed` to the user record instead of `plain`.
app.post('/signup',
// (Optional) Validate input
body('email').isEmail(),
body('password').isLength({ min: 6 }),
async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(422).json({ errors: errors.array() });
}
const { email, password } = req.body;
// Check if user already exists
let existing = await User.findOne({ email });
if (existing) {
return res.json({ success: false, message: 'Email already registered' });
}
// Hash and save the new user
const hashedPassword = await bcrypt.hash(password, 10);
await User.create({ email, password: hashedPassword });
res.json({ success: true, message: 'Signup successful' });
});
app.post('/login', async (req, res) => {
const { email, password } = req.body;
// Find user by email
const user = await User.findOne({ email });
if (!user) {
return res.json({ success: false, message: 'Invalid credentials' });
}
// Compare password hashes
const match = await bcrypt.compare(password, user.password);
if (!match) {
return res.json({ success: false, message: 'Invalid credentials' });
}
// Login successful – create session
req.session.userId = user._id; // store user ID in session
res.json({ success: true, message: 'Logged in' });
});
app.post('/logout', (req, res) => {
// Destroy the session on logout
req.session.destroy(err => {
if (err) {
return res.status(500).json({ success: false });
}
res.json({ success: true, message: 'Logged out' });
});
});