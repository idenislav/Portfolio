const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://admin:mongopass@cluster0-tyx6c.mongodb.net/PortfolioLeads?retryWrites=true&w=majority";
app.use(express.json());
app.use(cors());
const dbName = "PortfolioLeads";
const ObjectId = require("mongodb").ObjectId;

app.get("/", (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        console.log("Connected to the server");
        const db = client.db(dbName);
        const collection = db.collection("Leads");
        collection.find({}).toArray((err, docs) => {
            client.close();
            res.send(docs);
        });
    });
}); 

app.post("/", (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, {useUnifiedTopology: true}, function(err, client) {
        const db = client.db(dbName);
        const collection = db.collection("Leads");
        collection.insertMany([
            {
            firstName: req.body.Firstname,
            lastName: req.body.Lastname,
            email: req.body.email,
            phone: req.body.Phone,
            address: req.body.address,
            message: req.body.Message
            }
        ]) 
        client.close();
        res.send("message");
    })
})

app.put("/List/:ID", (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, {useUnifiedTopology: true}, (err, client) => {
        const db = client.db(dbName);
        const collection = db.collection("Leads");
        collection.find({_id: ObjectId(req.params.ID)})
        collection.updateOne({ _id: ObjectId(req.params.ID)}, {$set: req.body});
        client.close();
        res.send("Updated");
    })

})



app.delete("/List/:ID", (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        console.log("Connected to the server");
        const db = client.db(dbName);
        const collection = db.collection("Leads");
        collection.deleteOne({ _id: ObjectId(req.params.ID)});
        res.send("deleted")
    });
}); 


app.listen(port, () => console.log(`Listening on port ${port}`));