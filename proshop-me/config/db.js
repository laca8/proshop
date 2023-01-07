const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://laca:jae09908@cluster0.gjxhg.mongodb.net/proshop?retryWrites=true&w=majority',{
            useUnifiedTopology:true, //options to get warnings in console
            useNewUrlParser:true,
            //useCreateIndex:true,
        })
        console.log(`db connected ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.log(error);
        process.exit(1)
    }
}
module.exports = connectDB