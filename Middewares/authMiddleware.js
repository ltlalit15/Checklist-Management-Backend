import Admin from '../Models/DriverModel.js'
import  jwt from "jsonwebtoken"
import asyncHandler from"express-async-handler"

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Admin.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      res.json("Not Authorized token expired, Please Login again");
    }
  } else {
    res.json("There is no token attached to header");
  }
});


