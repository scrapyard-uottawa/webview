const express = require("express");
const pg = require("pg");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  host: "localhost",
  port: 5433, // change this if you have a different port number
  database: "ScrapYard",
  user: "Node",
  password: "password",
});

app.post("/uploadMachine", async (req, res) => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    const query =
      "INSERT INTO \"public\".\"Machine_List\" (\"MachineID\" , \"Machine_Name\" , \"Black_Bin\" , \"Blue_Bin\" , \"Compost\" , \"Garbage\" ) VALUES ($1,$2,$3,$4,$5,$6)";
    const values = [
      req.body.MachineID,
      req.body.Machine_Name,
      req.body.Black_Bin,
      req.body.Blue_Bin,
      req.body.Compost,
      req.body.Garbage,
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

app.post("/uploadTrash", async (req, res) => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database");
    const query =
      "INSERT INTO \"public\".\"Trash_Info\" (\"MachineID\" , \"ID\" , \"TimeStamp\" , \"ML_Confidence\" , \"WasteType\", \"Image\" ) VALUES ($1,$2,$3,$4,$5,$6)";
    const values = [
      req.body.MachineID,
      req.body.ID,
      req.body.TimeStamp,
      req.body.ML_Confidence,
      req.body.WasteType,
      req.body.Image,
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

// Listen on port 5000
app.listen(5000, () => {
  console.log("Server running on port 5000");
});