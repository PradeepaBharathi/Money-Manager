import { client } from "../db.js";
import { ObjectId } from "bson";
export function addExpense(data){
    return client
    .db("Moneytracker")
    .collection("expense")
    .insertOne(data)

}
export function getAllExpense(req){
    return client
    .db("Moneytracker")
    .collection("expense")
    .find(req.query)
    .toArray();
}

export function getExpenseById(id){
    return client
    .db("Moneytracker")
    .collection("expense")
    .findOne({_id: new ObjectId(id)})
}
export function editExpesnseById(id,data){
    return client
    .db("Moneytracker")
    .collection("expense")
    .findOneAndUpdate({_id : new ObjectId(id)},{$set:data})
}
export function deleteExpenseById(id,data){
    return client
    .db("Moneytracker")
    .collection("expense")
    .findOneAndDelete({_id : new ObjectId(id)},{$set:data})
}