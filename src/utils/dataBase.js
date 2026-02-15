const mongoose = require("mongoose");

const connectDB = async ()=>{
	try {
		await mongoose.connect(process.env.URL);
        console.log("DataBase connected successfully");
	} catch (error) {
		console.log(error);
	}
	
}
connectDB();