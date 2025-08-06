const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');
const accountRoutes = require('./routes/account.routes');

dotenv.config();

connectDB();

const app = express();

//CORS options configuration
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

//Middleware
app.use(cors(corsOptions));
app.use(express.json());

//Routes
app.use('/api/accounts', accountRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});