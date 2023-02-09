import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';
// Make a Controller directory and then Import all the functions from that


let users = []

// Browsers Can Only Check Get Request Not Post Request.
router.get('/' , (req,res)=>{
    // console.log(users)
    res.send(users)
})

// Get the Id of the User and use it to fet specific details
router.get('/:id' , (req,res)=>{
    const {id} = req.params
    const foundUser = users.find((user)=>user.id ===id)
    res.send(foundUser)
})

// Creating the User by Post Method
router.post('/',(req , res)=>{
    const user = req.body;
    // const a = uuidv4()
    users.push({...user ,id: uuidv4()});
    // console.log(users)
    res.send("added to database!");

}) // Frontend TO Server

// Using Delete Method to Delete User from the users array
router.delete('/:id' , (req , res)=>{
    const {id} = req.params
    users = users.filter((user)=>user.id !== id)
    res.send(`The user ID: ${id} is deleted`)
})


// Using Patch Method to Get the ID Variable and then changing the value 
router.patch('/:id', (req , res)=>{
    const {id} = req.params
    const {firstName , lastName , age} = req.body
    const user = users.find((user)=>user.id === id)
    if (firstName){
        user.firstName = firstName
    }
    if (lastName){
        user.lastName = lastName
    }
    if(age){
        user.age = age
    }
    res.send("I have Updated the Given Details Properly")
})

export default router