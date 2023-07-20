import express from "express";
import { addExpense, deleteExpenseById, editExpesnseById, getAllExpense, getExpenseById } from "../controllers/expense.js";

const router = express.Router();

router.post('/add-expense',async(req,res)=>{

    try {
        const newExpense = req.body;
        console.log(newExpense);
        if(!newExpense){
            return res.status(400).json({message:"no data availabe"})
        }
        const result = await addExpense(newExpense);
        if(!result.acknowledged){
            return res.status(400).json({message:"error occured"})
        }
        res.status(200).json({data:newExpense,status:result})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error occured"})
    }

})

router.get('/all',async(req,res)=>{
    try {
        const expenseData =  await getAllExpense(req);
        console.log(expenseData)
    if(!expenseData){
        return res.status(400).json({message:"no data availabe"})
    }
    res.status(200).json({data:expenseData})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

router.get("/all/:id",async(req,res)=>{
    try{
        const {id}= req.params;
        const income = await getExpenseById(id);
        if(!income){
            
            return res.status(400).json({message:"No data available"})

        }
        return res.status(200).json({data:income})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

router.put("/edit/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const updatedExpese = req.body;
        if(!id || !updatedExpese){
            return res.status(400).json({message:"Wrong request"})
        }
        const result = await editExpesnseById(id,updatedExpese)
        if(!result.lastErrorObject.updatedExpese){
            return res.status(400).json({message:"error occured"})
        }
        return res.status(201).json({data:updatedExpese,status:result})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

router.delete("/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteExpense = req.body;
        if(!id || !deleteExpense){
            return res.status(400).json({message:"Wrong request"})
        }
        const result = await deleteExpenseById(id,deleteExpense)
        if(!result.deletedCount<=0){
            return res.status(400).json({message:"error occured"})
        }
        return res.status(201).json({data:deleteExpense,status:result})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})


export const expenseRouter = router;