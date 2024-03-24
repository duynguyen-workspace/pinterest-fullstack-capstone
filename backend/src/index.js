import express from 'express';
import cors from 'cors'; 
import rootRoute from './routes/rootRoute.js';

//? INITIALISE EXPRESS APP
const app = express();

//? MIDDLEWARE
// Configuring app to use json
app.use(express.json())

// Positioning original directory path
app.use(express.static("."))

// Access permission for cross-platform applications
app.use(cors())

// Configuring root endpoint for calling APIs
app.use(rootRoute)

//? START SERVER at PORT (8080)
app.listen(8080);
