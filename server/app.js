import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import petsRouter from './routes/petRouter.js';
import usersRouter from './routes/userRouter.js';
import tasksRouter from './routes/taskRouter.js';
import uploadRouter from './routes/uploadRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const mongoUrl = process.env.MONGODB_ATLAS_KEY;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Udało się połączyć z bazą danych");
    })
    .catch((err) => {
        console.log(err);
    })

app.use("/upload", uploadRouter);
app.use('/uploads', express.static('uploads'));
app.use("/pets", petsRouter);
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

app.listen(PORT, (err) => {
    if (err) {
        console.log("Błąd przy ładowaniu serwera");
    }
    else {
        console.log(`Serwer nasłuchuje na porcie ${PORT}`);
    }
})