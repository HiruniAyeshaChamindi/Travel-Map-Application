const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const pinRoute = require('./routes/pinsRoutes');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error: ', error.message);
  });

app.use('/api/pins', pinRoute);

app.listen(8800, () => {
  console.log('Backend server is running on port 8800');
});
