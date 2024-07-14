import express from "express";
import { registerUser, loginUser } from "../controllers/userAuth.js";
import { getTeams } from "../controllers/teamsData.js";

const router = express.Router();

//register
router.post("/register", registerUser);
// //login
router.post("/login", loginUser);
// //logout user
// router.get('/logout',logout)
//get Teams
router.get("/teams",getTeams);

export default router;
