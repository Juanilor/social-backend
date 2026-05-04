import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB conectado: ", conn.connection.host);
    } catch (error){
        console.error("Error al conectar con la base de datos", error);
        process.exit();
    }
};