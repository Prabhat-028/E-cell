const mongoose = require("mongoose");

const connectDB = async ()=>{
	try {
		await mongoose.connect(process.env.URL);
        console.log("dataBase connected succesfully");
	} catch (error) {
		console.log(error);
	}
	
}
connectDB();