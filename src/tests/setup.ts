import mongoose, { Collection } from "mongoose";
import dotenv from "dotenv"

dotenv.config();


beforeAll(async () => {

    await mongoose.connect(process.env.MONGO_URI as string);
});

afterEach(async () => {

    const collections = mongoose.connection.collections;

    for(const key in collections){

        const collection = collections[key];
        await collection.deleteMany({});
    }

});

afterAll(async () => {
    await mongoose.connection.close();
});