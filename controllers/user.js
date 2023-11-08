import { client } from "../db.js";
import { ObjectId } from "bson";
import jwt from "jsonwebtoken";
export function getUser() {
    return client
        .db("Moneytracker")
        .collection("user")
        .find().toArray();
}

export function registerUser(data) {
    return client
        .db("Moneytracker")
        .collection("user")
        .insertOne(data);
}

export function getUserById(id) {
  return client
    .db("Moneytracker")
    .collection("user")
    .findOne({ _id: new ObjectId(id) });
}
export function getUserByEmail(email) {
  const query = { Email: email };
  console.log("Query:", query);
  return client.db("Moneytracker").collection("user").findOne(query);
}

export function generateToken(id, secret) {
    return jwt.sign(
        { id },
        process.env.SECRET_KEY,
        { expiresIn: "30d" }
    )
}

export function updateUserToken(userId, token) {
    return client
        .db("Moneytracker")
        .collection("user")
        .updateOne(
            { _id: userId },
            { $set: { token: token } }
        )
}
export function tokenUsed(data) {
    return client
        .db("Moneytracker")
        .collection("tokens")
        .insertOne(data)
}
