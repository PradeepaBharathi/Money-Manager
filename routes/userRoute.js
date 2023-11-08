import express from "express";
import { generateToken, getUserByEmail, updateUserToken, registerUser } from "../controllers/user.js";
import bcrypt from "bcryptjs"
const router = express.Router()

router.post("/add-user", async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;
        const salt = await bcrypt.genSalt(10)
        if (!Name, !Email, !Password) {
            return res.status(400).send({message:"Please fill in all details"})
        }

        const existingUser = await getUserByEmail(Email);
        if (existingUser) {
            return res.status(401).send({message:"user already exists"})
        }
        const hashedPassword = await bcrypt.hash(Password, salt)
        console.log(hashedPassword)
        
        const result = await registerUser({ Name, Email, Password :hashedPassword,})
        
        if (!result.acknowledged) {
            return res.status(500).send({message:"Error Occured"})
        }
        res.status(200).json({data:{Name,Email,hashedPassword},status:result,message:"user registered successfully"})
    } catch (error) {
        console.log(error)
        res
          .status(500)
          .json({ message: "server error occured", success: false, error });
    }
})

router.post("/login", async (req, res) => {
    const { Email, Password } = req.body
    if (!Email || !Password) {
        return res.status(400).send({message:"please fill all the details"})
    }
    try {
        const validUser = await getUserByEmail(Email)
        if (!validUser) {
            return res.status(404).send({message:"user not found"})
        }
        if (validUser) {
            const isMatch = await bcrypt.compare(Password, validUser.Password)
            if (!isMatch) {
                  return res
                    .status(400)
                    .send({ message: "Invalid Credentials" });
            }
            else {
                const token = generateToken(validUser._id);
                console.log(token)
               const updateTokenResult = await updateUserToken(
                 validUser._id,
                 token
                );
                
                if (updateTokenResult.acknowledged) {
                  res
                    .status(201)
                    .send({ status: 201, data: validUser, token: token });
                } else {
                  return res
                    .status(500)
                    .send({ message: "Error updating token" });
                }
            }
        
        }
    } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "server error occured", success: false, error });
    }
})
export const user_router = router;


