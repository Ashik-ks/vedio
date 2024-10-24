const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const mongoConnect = require("../server/db/connect");
mongoConnect();

const userRouter = require('./router/userRouter.js');

// Serve static files from the client directory
app.use(express.static('../client'));

// Increase size limits for JSON and URL-encoded data
const requestLimit = '500mb'; // You can adjust this as needed
app.use(express.json({ limit: requestLimit }));
app.use(express.urlencoded({ limit: requestLimit, extended: true }));

// Serve files from the uploads directory
app.use('/uploads', express.static("./uploads"));

// Use user router for handling user-related routes
app.use(userRouter);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
