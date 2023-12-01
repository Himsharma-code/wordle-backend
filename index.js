const express = require('express');
const app = express();
const connection = require('./api/connection');


app.use(express.json())
app.use('/api',require('./api/index'))


connection.createMongoConnection();
const dbConnection = connection.getMongoConnection();
dbConnection.on('error', connection.onError);
dbConnection.on('open', connection.onSuccess);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
