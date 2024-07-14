import express from "express";
import cors from "cors";
import xlsx from "xlsx";
import dotenv from "dotenv";
dotenv.config();
import dbConnection from "./Connection/dbConnection.js";
import router from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static("fronted"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// // קריאת הנתונים מקובץ האקסל
// const workbook = xlsx.readFile("/home/eden/Desktop/newwolbee/server/employeesUpdated.xlsx");
// const worksheet = workbook.Sheets[workbook.SheetNames[0]];
// const data = xlsx.utils.sheet_to_json(worksheet);

// FOR GOOD GOOD PRACTICE. since"" empty env is a red flag
const port = process.env.PORT ?? 4000;

// api endpoint

app.use("/api", router);

// app.post("/addemployee", async (req, res) => {
//   console.log('hi');
//   try {
//     const {
//       fullName, employeeOfManagerId, id, role, DataOfBirth, PlaceOfResidence, FamilyStatus,
//       NumOfChildren, YearsInTheCompany, Anniversary, InterestingFact, LastestActivity,
//       ClosestPersonalEvent, singers, FoodAndDrinks, Restaurants, Hobbys } = req.body;

//     if (
//       fullName && employeeOfManagerId && id && role && DataOfBirth && PlaceOfResidence
//       && FamilyStatus && NumOfChildren !== undefined && YearsInTheCompany !== undefined
//       && Anniversary && InterestingFact && LastestActivity && ClosestPersonalEvent
//       && singers && FoodAndDrinks && Restaurants && Hobbys) {
//       const employee = new Employee({
//         fullName, employeeOfManagerId, id, role, DataOfBirth, PlaceOfResidence, FamilyStatus,
//         NumOfChildren, YearsInTheCompany, Anniversary, InterestingFact, LastestActivity,
//         ClosestPersonalEvent, singers, FoodAndDrinks, Restaurants, Hobbys});

//       await employee.save();
//       console.log("Employee registered successfully:", employee);
//       res.status(201).send("Employee registered successfully");
//     } else {
//       res.status(400).send("Invalid data");
//     }
//   } catch (error) {
//     console.error("Error registering employee:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.post('/findemployees', async (req, res) => {
//   try {
//     const manager = req.body;
//     if (manager) {
//       const currentManagerData = await Manager.findOne({
//         email: manager.email,
//         password: manager.password
//       });
//       if (currentManagerData) {
//         const employeesArr = await Employee.find({ employeeOfManagerId: currentManagerData.id });
//         console.log(employeesArr);
//         res.json(employeesArr);
//       }
//     } else {
//       res.status(400).send("Manager ID is required");
//     }
//   } catch (error) {
//     console.error("Error finding employees:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

dbConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

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
