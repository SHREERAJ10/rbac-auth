import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const parsedData = req.validatedData;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(parsedData.password, salt);
    const validData = {
      name: parsedData.name,
      email: parsedData.email,
      password: password,
    };

    const result = await prisma.user.create({
      data: validData,
    });
    res.status(201).json({'success':true,'message':'you have been registered successfully. You can now log in!'});
  } catch (err) {
    if (err.code == "P2002" && err.meta.modelName == "User") {
      if (err.meta.target[0] == "name") {
        console.log(err);
        res.status(400).json({
          success: false,
          error: "name already taken. Try something else!",
        });
      } else if (err.meta.target[0] == "email") {
        console.log(err);
        res
          .status(400)
          .json({ success: false, error: "email already in use!" });
      }
    } else {
      console.log(err);
      res.status(500).json({ success: false, error: "server error!" });
    }
  }
};

export default register;
