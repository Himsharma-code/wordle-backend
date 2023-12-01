const express = require('express')
const router = express.Router()

router.use("/auth", require('./routes/auth'))


module.exports = router