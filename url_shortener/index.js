import express from "express";
import mongoose from "mongoose";
import shortUrl from './models/shortUrl.js'
const app   = express()
const port = 5000;

mongoose.connect('mongodb://localhost/urlShortener' , {
    useNewUrlParser : true , useUnifiedTopology: true
})

// First setup the index from views
app.set('view engine' , 'ejs')
app.use(express.urlencoded({extended:false}))

app.get('/',async(req,res)=>{
    const shortUrls = await shortUrl.find()
    res.render('index' , { shortUrls: shortUrls })
    
})

app.post('/shortUrl', async(req , res)=>{
await shortUrl.create({full:req.body.fullUrl})
res.redirect('/')
})

app.get('/:shortUrl' , async(req,res)=>{
    await shortUrl.findOne({short:req.params.shortUrl})
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
})
app.listen(port,(req,res)=>{
    console.log("Port Running on Localhost:5000")
})