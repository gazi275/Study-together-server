
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

const port = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());






const uri = "mongodb+srv://study-together:TCCvBhcN8ypWt1p0@cluster0.yv7cgkn.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();
     
      const assignmentCollection=client.db("assignmentDB").collection("assignment");
      app.post("/assignment", async (req, res) => {
        const assignment = req.body;
        console.log(assignment);
        const result = await assignmentCollection.insertOne(assignment);
        
        res.send(result);
      });

      app.get("/assignment", async (req, res) => {
        const result = await assignmentCollection.find().toArray();
        res.send(result);
      });

      app.put("/updatedassignment/:id", async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        console.log("id", id, data);
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedProduct = {
          $set: {
            title: data.title,
             email: data.email,
             marks:data.marks,
             image:data.image,
             description:data.description,
             level:data.level,
             date:data.date
          },
          
        };
        console.log(updatedassignment);
        const result = await assignmentCollection.updateOne(
          filter,
          updatedProduct,
          options
        );
        res.send(result);
      });

      app.get("/details/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = {
          _id: new ObjectId(id),
        };
        const result = await assignmentCollection.findOne(query);
        console.log(result);
        res.send(result);
      });






     await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);








app.get("/", (req, res) => {
    res.send("Crud is running...");
  });
  
  app.listen(port, () => {
    console.log(`Simple Crud is Running on port ${port}`);
  });
    