const mongoose = require('mongoose');
//链接mongodb 并且使用job集合
const DB_URL = 'mongodb://localhost:27017/job'
mongoose.connect(DB_URL)