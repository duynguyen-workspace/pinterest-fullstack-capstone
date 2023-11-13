//? INITIALISE EXPRESS APP

import express from 'express';
import cors from 'cors'; 
import rootRoute from './routes/rootRoutes.js';

const app = express();

//? MIDDLEWARE FUNCTIONS
app.use(express.json());
app.use(express.static(".")) //* Định vị lại đường dẫn để load tài nguyên ở BE

//* cors middleware
app.use(cors())

//? PORT INITIALISATION
app.listen(8080);

app.use("/api",rootRoute)
