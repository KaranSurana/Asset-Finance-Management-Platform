const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());

const connectDB = require("./config/db");
connectDB();

app.get('/health', (req,res)=>{
    res.send("Working");
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/user', userRoutes);

app.use('/applications', applicationRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT,  () => {
//     console.log(`Server is running on port ${PORT}`);
// });

module.exports.handler = serverless(app)