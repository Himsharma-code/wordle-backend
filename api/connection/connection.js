let mongoose = require('mongoose');

const createMongoConnection = () =>{
    mongoose.connect("mongodb://localhost/wordle_db")
}

const getMongoConnection = () =>{
    return mongoose.connection;
}

const onError = () =>{
    console.log("Database Error");
}
const onSuccess = () => {
    console.log("connected with database");
}
module.exports = {
    createMongoConnection,
    getMongoConnection,
    onError,
    onSuccess
}