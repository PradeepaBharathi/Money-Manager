import { client } from "../db.js";
import { ObjectId } from "bson";
export function addIncome(data){
    return client
    .db("Moneytracker")
    .collection("income")
    .insertOne(data)

}

export function getAllIncome(req){
    return client
    .db("Moneytracker")
    .collection("income")
    .find(req.query)
    .toArray();
}
export function getIncomeById(id){
    return client
    .db("Moneytracker")
    .collection("income")
    .findOne({_id: new ObjectId(id)})
}

export function editIncomeById(id,data){
    return client
    .db("Moneytracker")
    .collection("income")
    .findOneAndUpdate({_id : new ObjectId(id)},{$set:data})
}
export function deleteIncomeById(id,data){
    return client
    .db("Moneytracker")
    .collection("income")
    .findOneAndDelete({_id : new ObjectId(id)},{$set:data})
}
