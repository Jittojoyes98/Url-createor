const express=require('express')
const app=express();
const mongoose=require('mongoose')
const shortUrl=require('./models/shortUrl');
const bodyParser=require('body-parser');

// const newUser=require('./models/signupmodel');

app.use(bodyParser.json({extended: true}));

mongoose.connect('mongodb://localhost/urlShortner',{
    useNewUrlParser:true, useUnifiedTopology:true,
})

app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
app.listen(process.env.PORT || 5000);
app.get("/",async(req,res)=>{
    // now to give back the data or to store it somewhere
    const shortUrlGot=await shortUrl.find(); 
    res.render('index',{shortUrlGot:shortUrlGot});
})
// app.get("/new",(req,res)=>{
//     res.send('Hello');
// })
app.post("/shortUrls",async(req,res)=>{
    await shortUrl.create({ full: req.body.fullUrl});
    res.redirect('/');
})



app.post("/signup",(req,res)=>{
    res.render('signup');
})

app.post("/features",(req,res)=>{
    res.render('features');
})

app.get('/:shortUrl',async (req,res)=>{
    const shortUrlResult = await shortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrlResult == null) return res.sendStatus(404)

    shortUrlResult.click++
    shortUrlResult.save()

    res.redirect(shortUrlResult.full)
})
