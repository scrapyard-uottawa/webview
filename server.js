const express = require("express");
const pg = require("pg");
const cors = require("cors");
const multer = require("multer");
const app = express();
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  host: "10.10.1.20",
  port: 5433, // change this if you have a different port number
  database: "ScrapYard",
  user: "Node",
  password: "password",
});

// create multer storage engine
const storage = multer.memoryStorage(); // use memory storage instead of disk storage

// create multer middleware function
const upload = multer({ storage: storage });

// create a route for uploading images
app.post("/uploadTrash", upload.single("Image"), async (req, res) => {
  try {
    // get the data from req.body and req.file
    const { MachineID, ID, TimeStamp, ML_Confidence, WasteType } = req.body;
    const Image = req.file.buffer; // use buffer instead of filename

    // construct the query string for inserting data into database
    const query =
      'INSERT INTO "public"."Trash_Info" ("MachineID" , "ID" , "TimeStamp" , "ML_Confidence" , "WasteType", "Image" ) VALUES ($1,$2,$3,$4,$5,$6)';
    const values = [MachineID, ID, TimeStamp, ML_Confidence, WasteType, Image];

    // execute the query with values array using connection pool client
    await pool.query(query, values);
    console.log("Data uploaded successfully");
    
    res.json({ message: "Data uploaded successfully" });
  } catch (error) {
    // If there is an error, send back an error message
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
});

app.post("/uploadMachine", async (req, res) => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    const query =
      "INSERT INTO \"public\".\"Machine_List\" (\"MachineID\" , \"Machine_Name\" , \"Black_Bin\" , \"Blue_Bin\" , \"Compost\" , \"Garbage\" , \"GPS\" ) VALUES ($1,$2,$3,$4,$5,$6,$7)";
    const values = [
      req.body.MachineID,
      req.body.Machine_Name,
      req.body.Black_Bin,
      req.body.Blue_Bin,
      req.body.Compost,
      req.body.Garbage,
      req.body.GPS,
    ];
    console.log(values);
    await client.query(query, values); // add await here
    console.log("Data uploaded successfully");
    await client.release(); // add await here
    console.log("Connection released");
    res.json({ message: "Data uploaded successfully" });
  } catch (error) {
    // If there is an error, send back an error message
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
});

app.post("/uploadUser", async (req, res) => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    const query =
      "UPDATE \"public\".\"Machine_List\" SET \"Users\" = array_append(\"Users\", $1) WHERE \"MachineID\" = $2";
    const values = [req.body.User, req.body.MachineID];
    console.log(values);
    await client.query(query, values); // add await here
    console.log("Data uploaded successfully");
    await client.release(); // add await here
    console.log("Connection released");
    res.json({ message: "Data uploaded successfully" });
  } catch (error) {
    // If there is an error, send back an error message
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
});

app.post("/removeUser", async (req, res) => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    const query =
      "UPDATE \"public\".\"Machine_List\" SET \"Users\" = array_remove(\"Users\", $1) WHERE \"MachineID\" = $2";
    const values = [req.body.User, req.body.MachineID];
    console.log(values);
    await client.query(query, values); // add await here
    console.log("User removed successfully");
    await client.release(); // add await here
    console.log("Connection released");
    res.json({ message: "User removed successfully" });
  } catch (error) {
    // If there is an error, send back an error message
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
});

app.get("/getMachines", async (req, res) => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    const query = 'SELECT * FROM "public"."Machine_List"';
    const result = await client.query(query); // add await here
    console.log("Data retrieved successfully");
    await client.release(); // add await here
    console.log("Connection released");
    res.json(result.rows); // send back the rows as JSON
  } catch (error) {
    // If there is an error, send back an error message
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
});

app.get("/getDetections", async (req, res) => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    const query = 'SELECT \"MachineID\", \"ID\", \"TimeStamp\", \"ML_Confidence\", \"WasteType\", encode(\"Image\", \'base64\') as base64 FROM "public"."Trash_Info"';
    const result = await client.query(query);
    console.log("Data retrieved successfully");
    await client.release();
    console.log("Connection released");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
});

// Listen on port 5000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});