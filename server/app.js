import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import petsRouter from './routes/petRouter.js';
import usersRouter from './routes/userRouter.js';
import tasksRouter from './routes/taskRouter.js';
import uploadRouter from './routes/uploadRouter.js';

const app = express();
const PORT = 3001;
const mongoUrl = 'mongodb+srv://olga:zwierzaki2012@cluster0.f72advh.mongodb.net/?retryWrites=true&w=majority';

app.use(cookieParser());
app.use(express.json());

mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Udało się połączyć z bazą danych");
    })
    .catch((err) => {
        console.log(err);
    })

app.use("/upload", uploadRouter);
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