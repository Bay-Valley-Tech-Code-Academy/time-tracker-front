const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI)

const connectDB = require('./config/db');
const accountRoutes = require('./routes/account.routes');
const entriesRoutes = require('./routes/timeEntry.routes');
const projectRoutes = require('./routes/project.routes');

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
app.use("/api/entries", entriesRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});