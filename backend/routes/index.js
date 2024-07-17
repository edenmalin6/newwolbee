import express from "express";
import { registerUser, loginUser } from "../controllers/userAuth.js";
import { getTeams } from "../controllers/teamsData.js";
import { getEmployees } from "../controllers/employeesData.js";

const router = express.Router();

//register
router.post("/register", registerUser);
// //login
router.post("/login", loginUser);
// //logout user
// router.get('/logout',logout)
//get Teams
router.get("/teams",getTeams);
//get all employees
router.get("/getEmployees",getEmployees);


export default router;
