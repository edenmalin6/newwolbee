import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import xlsx from "xlsx"
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("fronted"));

// התחברות לבסיס הנתונים
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected"))
  .catch((error) => console.error("Error connecting to DB:", error));

const corsOptions = {
  origin: 'http://localhost:3000' // Replace this with your frontend URL
};
app.use(cors(corsOptions));

// קריאת הנתונים מקובץ האקסל
const workbook = xlsx.readFile("/home/eden/Desktop/newwolbee/backend/employeesUpdated.xlsx");
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(worksheet);




// הוספת הנתונים מהאקסל למסד הנתונים
// data.forEach(async (row) => {
//   const employee = new Employee({
//     fullName: row.fullName,
//     employeeOfManagerId: row.employeeOfManagerId,
//     id: row.id,
//     role: row.role,
//     DataOfBirth: row.DataOfBirth,
//     PlaceOfResidence: row.PlaceOfResidence,
//     FamilyStatus: row.FamilyStatus,
//     NumOfChildren: row.NumOfChildren,
//     YearsInTheCompany: row.YearsInTheCompany,
//     Anniversary: row.Anniversary,
//     LastestActivity: row.LastestActivity || [],
//     InterestingFact: row.InterestingFact,
//     ClosestPersonalEvent: row.ClosestPersonalEvent || [],
//     singers: row.singers ,
//     FoodAndDrinks: row.FoodAndDrinks || [],
//     Restaurants: row.Restaurants || [],
//     Hobbys: row.Hobbys || [],
//     TopInsights: row.TopInsights || [],
//     LatestInfo: row.LatestInfo || []
//   });

//   await employee.save();
// });



// POST route לקבלת נתוני המשתמש מהעמוד ולשמירתם במסד הנתונים
app.post("/register", async (req, res) => {
  try {
    const { email, password, id: managerId } = req.body; // Extract managerId from req.body
    if (email && password && managerId) { // Check if managerId exists
      const manager = new Manager({ email, password, id: managerId });
      await manager.save();
      console.log("User registered successfully:", manager);
      res.status(201).send("User registered successfully");
    } else {
      res.status(400).send("Invalid data");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const manager = await Manager.findOne({ email, password });
    if (manager) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/addemployee", async (req, res) => {
  console.log('hi');
  try {
    const {
      fullName, employeeOfManagerId, id, role, DataOfBirth, PlaceOfResidence, FamilyStatus,
      NumOfChildren, YearsInTheCompany, Anniversary, InterestingFact, LastestActivity,
      ClosestPersonalEvent, singers, FoodAndDrinks, Restaurants, Hobbys } = req.body;

    if (
      fullName && employeeOfManagerId && id && role && DataOfBirth && PlaceOfResidence
      && FamilyStatus && NumOfChildren !== undefined && YearsInTheCompany !== undefined
      && Anniversary && InterestingFact && LastestActivity && ClosestPersonalEvent
      && singers && FoodAndDrinks && Restaurants && Hobbys) {
      const employee = new Employee({
        fullName, employeeOfManagerId, id, role, DataOfBirth, PlaceOfResidence, FamilyStatus,
        NumOfChildren, YearsInTheCompany, Anniversary, InterestingFact, LastestActivity,
        ClosestPersonalEvent, singers, FoodAndDrinks, Restaurants, Hobbys});
        
      await employee.save();
      console.log("Employee registered successfully:", employee);
      res.status(201).send("Employee registered successfully");
    } else {
      res.status(400).send("Invalid data");
    }
  } catch (error) {
    console.error("Error registering employee:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/findemployees', async (req, res) => {
  try {
    const manager = req.body;
    if (manager) {
      const currentManagerData = await Manager.findOne({
        email: manager.email,
        password: manager.password
      });
      if (currentManagerData) {
        const employeesArr = await Employee.find({ employeeOfManagerId: currentManagerData.id });
        console.log(employeesArr);
        res.json(employeesArr);
      }
    } else {
      res.status(400).send("Manager ID is required");
    }
  } catch (error) {
    console.error("Error finding employees:", error);
    res.status(500).send("Internal Server Error");
  }
});

const port = 5000; //סוג הפורט
app.listen(port, () => {
  console.log("listening on port localhost:" + port);
});
