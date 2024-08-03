require('dotenv').config();
const todoRoutes = require('./routes/todo');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const express = require('express');
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

// Routes
app.use('/api/todos',todoRoutes);
app.use('/auth/user',userRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(process.env.PORT, () =>{
    console.log(`Connected on DB and Server is running on port ${process.env.PORT}`);
  })
})
.catch((err) => {
  console.log(err);
});

