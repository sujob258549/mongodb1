const express = require('express')
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

// OVfL6jK9tHsXqnre
// sujon
app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://sujon:OVfL6jK9tHsXqnre@atlascluster.aasa6jh.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

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
        // Connect the client to the server	(optional starting in v4.7)
        const database = client.db("usersDB");
        const userConnection = database.collection("users");

        app.get('/users', async (req, res) => {
            const carsor = userConnection.find()
            const result = await carsor.toArray()
            res.send(result)

        })

        app.delete('users/:id', async(req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId (id) };
            const result = await userConnection.deleteOne(query);
            res.send(result);
        })


        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user)
            const result = await userConnection.insertOne(user);
            res.send(result)

        })
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})