import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'


dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));


app.use(cors());

app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send('Hello from DALLE');
});

const startServer = async () => { 
    try {
        connectDB(process.env.MONGO_URL);
        app.listen(8000, () => console.log('Sever Started on http://localhost:8000'))
    } catch (error) {
        console.log(error);
    }
}

startServer();