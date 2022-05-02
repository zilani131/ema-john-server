const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const port=process.env.PORT||5000;
const app =express();
require('dotenv').config();
// middleware
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{

    res.send('John is running')
});
app.listen(port
//     ,()=>{
//     // console.log('john is running on port',port);
// }
);

// mongodb

//   const collection = client.db("emaJohn").collection("products");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9ahxm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
       await client.connect();
       const productCollection = client.db("emaJohn").collection("products");
       app.get('/product',async (req,res)=>{
        //    console.log('query',req.query)
           const page=parseInt(req.query.page); //we have to convert it to number as it is in string format
           const size=parseInt(req.query.size);
           const query={};
           const cursor=productCollection.find(query);
        //    const products=await cursor.limit(10).toArray(); here if we set limit(10) we will get maximum 10 data
        let products;
        if(page||size){ //page number is started with zero but in url we just modify it number +1; page=number
            products=await cursor.skip(page*size).limit(size).toArray();
            //dynamically we skip the product lets say page 0 then it will show the given size product if page 1 then it will skip 1*size product and show the next 10;
        }
        else{
            products=await cursor.toArray();
        }
      
           res.send(products);
       })
    //    number of product
    app.get('/productCount',async (req,res)=>{
        
        const numOfProduct=await productCollection.estimatedDocumentCount(); //we get this from error
        // res.json(numOfProduct);
        res.send({numOfProduct}); //not write only res.send(numOfProduct) as we will not able to parse it 
    })
    // use post to get products by id 
    app.post('/productsByKeys',async(req,res)=>{
        const keys =req.body;
        const ids=keys.map(id=>ObjectId(id)) //By ObjectId we find the individual id from mongodb
        // console.log(keys,ids)
        const query={_id:{$in:ids}}
        const cursor=productCollection.find(query);
        const products=await cursor.toArray();
        res.send(products);
    })
    }
    finally{

    }
}
run().catch()