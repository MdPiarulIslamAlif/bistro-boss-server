const express = require("express")
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config()
const port = process.env.PORT || 5000



app.use(cors())
app.use(express.json())


// process.env.DB_USER
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tcgprmi.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


async function run() {
  try {
    await client.connect();

    const menuCollection = client.db("bistroDb").collection("menu");
    const reviewCollection = client.db("bistroDb").collection("reviews");
    
    app.get('/menu', async(req,res)=>{
     const result = await menuCollection.find().toArray();
     res.send(result);
    })
    app.get('/reviews', async(req,res)=>{
     const result = await reviewCollection.find().toArray();
     res.send(result);
    })



    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  
//     await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req, res)=>{
     res.send('boss is sitting')
})

app.listen(port,()=>{
     console.log(`Bistro boss is sitting on port ${port}`);
})