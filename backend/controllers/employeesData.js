import EmployeeModel from "../models/EmployeesModel.js";

export const getEmployees =  async (req, res) => {
    let employees;
  try {    
      employees = await EmployeeModel.find({})            
    } catch (error) {
      console.error("Error finding employees:", error);
      res.status(500).send("Internal Server Error");
    }
    res.status(200).json(employees);
  }