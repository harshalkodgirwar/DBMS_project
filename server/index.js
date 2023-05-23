const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb").ObjectId;
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Connection URL
const url = "mongodb+srv://harshalkod:LDdnWxyIfoZvc5Kf@cluster1.kf0oksm.mongodb.net/?retryWrites=true&w=majority"; 
// Database Name
const dbName = "emp"; 

// Collection Name
const collectionName = "employees"; 

// Function to connect to the MongoDB database
async function connectToDatabase() {
  try {
    // Create a new MongoClient
    const client = new MongoClient(url);

    // Connect the client to the server
    await client.connect();

    // Select the database
    const db = client.db(dbName);

    // Return the database instance
    return db;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

app.post("/create", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Get the collection
    const collection = db.collection(collectionName);

    // Insert a document
    const insertResult = await collection.insertOne({
      name,
      age,
      country,
      position,
      wage,
    });
    console.log("Inserted document:", insertResult.ops[0]);
    res.send("Values Inserted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error inserting values");
  }
});

app.get("/employees", async (req, res) => {
  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Get the collection
    const collection = db.collection(collectionName);

    // Find documents
    const findResult = await collection.find({}).toArray();
    res.send(findResult);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving employees");
  }
});




app.listen(3001, () => {
  console.log("Yay, your server is running on port 3001");
});
``
