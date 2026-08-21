const express = require("express");
const CookieParser = require("cookie-parser");
const cors = require('cors');
const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

const app = express();

// use middleware
app.use(express.json());
app.use(CookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/auth' , authRoutes);
app.use('/api/music' , musicRoutes);

module.exports = app;
