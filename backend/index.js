const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

app.use(express.json());
app.use(cors());

const connectDB = require("./config/db");
connectDB();

app.get('/health', (req,res)=>{
    res.send("Wo  in ");
});
app.use('/user', userRoutes);
app.use('/applications', applicationRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server is running on port ${PORT}`);
// });

module.exports.handler = serverless(app)