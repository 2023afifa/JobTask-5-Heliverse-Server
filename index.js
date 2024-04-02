const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://jobtask-heliverse:bNjwasOK0aBzs94w@cluster0.etbjr0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        // await client.connect();

        const userCollection = client.db("jobHeliverse").collection("users");


        app.get("/users", async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result);
        })

        app.get("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        app.post("/users", async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })


        // Pagination Feature
        app.get("/usersCount", async (req, res) => {
            const count = await userCollection.estimatedDocumentCount();
            res.send({ count });
        })


        app.get('/usersPage', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const result = await userCollection.find().skip(page * size).limit(size).toArray();
            console.log("result ", result);
            res.send(result);
        })




        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

        // await client.close();
    }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("Heliverse");
})

app.listen(port, () => {
    console.log(`Heliverse is running on port ${port}`);
})