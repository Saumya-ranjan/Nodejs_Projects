import express from "express";
const router = express.Router();
const users = [{
    name: "Saumyaranjan",
    lastname : "Parida",
    age:"20"
}]

// Browsers Can Only Check Get Request Not Post Request.
router.get('/' , (req,res)=>{
    // console.log(users)
    res.send(users)
})

router.post('/',(req , res)=>{
    const user = req.body;
    users.push(user);
    // console.log(users)
    res.send("added to database!");

}) // Frontend TO Server

export default router