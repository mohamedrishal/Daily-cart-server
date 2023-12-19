const mongoose =require('mongoose')

const connection_string = process.env.DB_CONNECTION_STRING

mongoose.connect(connection_string).then((res)=>{
    console.log("Mongoose Connection Successfully with Dc_server");
}).catch((err)=>{
    console.log(err);
})