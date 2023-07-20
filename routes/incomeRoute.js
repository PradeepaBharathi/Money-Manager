import express from "express";
import { addIncome, deleteIncomeById, editIncomeById, getAllIncome, getIncomeById } from "../controllers/income.js";

const router = express.Router();

router.post('/add-income',async(req,res)=>{

    try {
        const newIncome = req.body;
        console.log(newIncome);
        if(!newIncome){
            return res.status(400).json({message:"no data availabe"})
        }
        const result = await addIncome(newIncome);
        if(!result.acknowledged){
            return res.status(400).json({message:"error occured"})
        }
        res.status(200).json({data:newIncome,status:result})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error occured"})
    }

})

router.get('/all',async(req,res)=>{
    try {
        const incomeData =  await getAllIncome(req);
        console.log(incomeData)
    if(!incomeData){
        return res.status(400).json({message:"no data availabe"})
    }
    res.status(200).json({data:incomeData})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

router.get("/all/:id",async(req,res)=>{
    try{
        const {id}= req.params;
        const income = await getIncomeById(id);
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
        const updatedIncome = req.body;
        if(!id || !updatedIncome){
            return res.status(400).json({message:"Wrong request"})
        }
        const result = await editIncomeById(id,updatedIncome)
        if(!result.lastErrorObject.updatedExisting){
            return res.status(400).json({message:"error occured"})
        }
        return res.status(201).json({data:updatedIncome,status:result})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

router.delete("/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteIncome = req.body;
        if(!id || !deleteIncome){
            return res.status(400).json({message:"Wrong request"})
        }
        const result = await deleteIncomeById(id,deleteIncome)
        if(!result.deletedCount<=0){
            return res.status(400).json({message:"error occured"})
        }
        return res.status(201).json({data:deleteIncome,status:result})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

export const moneyRouter = router;