//importing library
const mongoose =require('mongoose');

//connecting to database
mongoose.connect('mongodb://localhost/todosApp');

//aquiring the connection
const db = mongoose.connection;

db.on('error', console.error.bind(console,'Error in connecting to MongoDB'));

db.once('open',function(){
    console.log("Connected to Database::MongoDB");
});
 //Exporting db
module.exports=db;
