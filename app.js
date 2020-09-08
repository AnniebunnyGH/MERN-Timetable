const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/user',require('./routes/user'))
app.use('/api/creater', require('./routes/creater'))

app.use('/api/timetable', require('./routes/timetable'))



const PORT = config.get('port') || 3000

async function start() {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true, //не ясно
      useCreateIndex: true,
    })
  } catch (err) {
    console.error(err.message)
    process.exit(1) // Не ясно
  }
}

start()

app.listen(PORT, () => {
  console.log(`App has been started on http://localhost:${PORT}`)
})