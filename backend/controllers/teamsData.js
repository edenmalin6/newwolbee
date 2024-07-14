import TeamModel from "../models/TeamModel.js"

export const getTeams = async(req, res) =>{
    let teams;
    try {
         teams = await TeamModel.find({});
     
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "An error occurred while fetching team names." });
    }
    res.status(200).json(teams);
}