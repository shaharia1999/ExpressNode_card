const express=require('express');
const cors=require("cors")
const app=express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId=require('mongodb').ObjectId;
const port=process.env.PORT || 5000;

// use middleware

// dbuser1 <password>
// 


const uri = "mongodb+srv://dbuser1:hXYRbImf5rpko23f@cluster0.rykcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 async function run(){
     try{
         //collection
        await client.connect();
        const userCollection=client.db('foodExpress').collection('user');

       /// get api
       app.get('/user',async(req,res)=>{
           const query={};
           const cursor=userCollection.find(query);
           const users=await cursor.toArray();
           res.send(users)



       })
       // delete user
       app.delete('/user/:id',async(req,res)=>{
           const id=req.params.id;
           const query={_id:ObjectId(id)}
           const result=await userCollection.deleteOne(query);
           res.send(result);
       })
        // Post api
        app.post('/user',async(req,res)=>{
            const newUser=req.body;
            console.log('adding a new user',newUser)
            const result=await userCollection.insertOne(newUser)
            res.send(result)

        })

     }
     finally{

     }

 }
 run().catch(console.dir)

app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Ronni monni munna')

});
app.listen(port,()=>{
    console.log("Card server Start");
})