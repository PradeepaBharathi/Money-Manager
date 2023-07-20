import { MongoClient } from "mongodb";
import dotenv from "dotenv"
import Obj from "mongodb"
dotenv.config();
const mongoConnectionString= process.env.MONGO_URL


export async function dbConnection(){
    // const client = new MongoClient(mongoConnectionString);
    const client = await MongoClient.connect(mongoConnectionString, { useUnifiedTopology: true });
    await client.connect();
    console.log("DB Connected");
    return client
}

export var ObjectId = Obj.ObjectId;
export const client = await dbConnection();