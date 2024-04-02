const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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
            console.log(result);
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