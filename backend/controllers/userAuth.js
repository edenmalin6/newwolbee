//should add jsonwebtoken";
import UserModel from "../models/UserModel.js";

export const registerUser = async (req, res) => {
  const { email, password, id } = req.body;
  let verifyEmail;
  let payload;
  try {
    // verifyEmail = await UserModel.findOne({ email });
    // if (verifyEmail) throw new InvalidEmail("Email already exists");
      payload = {
        email,
        password,
        id,
        role: id == 0 ? "manager": "otherUser"
      };

    const createUser = new UserModel(payload);
    const savedNewUser = await createUser.save();
    return res.status(201).json(savedNewUser)
  } catch (error) {
    if (error instanceof InvalidEmail) {
      return res.status(400).send(error.message);
    }
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await UserModel.findOne({ email });
    if (!user) throw new InvalidEmail("User does not exists.");
    if (user.password !== password)
      throw new InvalidPassword("Password is incorrect.");
    
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof InvalidEmail || error instanceof InvalidPassword) {
      return res.status(400).send(error.message);
    }
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

class InvalidEmail extends Error {}
class InvalidPassword extends Error {}
