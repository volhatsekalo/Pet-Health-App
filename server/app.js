import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';

import petsRouter from './routes/petRoutes.js';
import usersRouter from './routes/userRoutes.js';
import tasksRouter from './routes/taskRoutes.js';

const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/pets", petsRouter); 
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter)

app.listen(PORT, (err) => {
    if (err) {
        console.log("Błąd przy ładowaniu serwera");
    }
    else {
        console.log(`Serwer nasłuchuje na porcie: ${PORT}`);
    }
})