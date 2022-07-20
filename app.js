
var express=require("express");
var bodyParser=require("body-parser");
images = [{image:"https://drive.google.com/file/d/1RFBnlfojEBKoWkCvobc1Eexgdps50hcX/view?usp=sharing"}];

const mongoose = require('mongoose');

const url = `mongodb+srv://soma1999:soma1999@cluster0.tefqe.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

var db=mongoose.connection;

var app=express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));
app.set("view engine", "ejs");


app.post('/sign_up', async function(req,res){
   var username = req.body.username;
   var pass = req.body.password;


   var data = {
      "username": username,
      "password":pass,
   }

   await db.collection('details').insertOne(data, async function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   });

   var testData;
    testData = await db.collection("details").find({}).toArray(async function(err, result) {
    if (err) throw err;
    testData = await result;
   
    console.log(testData);
    res.render('secret', {data:result});
  });
  
  
    
})

app.get('/',function(req,res){
   res.set({
      'Access-control-Allow-Origin': '*'
   });
   return res.render('signup');
}).listen(3000)

console.log("server listening at port 3000");
