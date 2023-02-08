import express from "express";
import bodyparser from "body-parser";
import usersRoute from './routes/users.js'


const app = express();
const port = 5000;

app.use(bodyparser.json());
app.use('/users',usersRoute)


app.get('/' , (req,res)=>{
    res.send("Hello World")
})

app.listen(port , ()=>{
    console.log(`Server Running on ${port}`)
})
