import express from "express";
import refreshRoute from "./refreshRoute";
import loginRoute from "./loginRoute";
import logoutRoute from "./logoutRoute";

const auth = express.Router();

auth.use('/login', loginRoute);

auth.use("/logout", logoutRoute);

auth.use('/refresh',refreshRoute);

export default auth;
