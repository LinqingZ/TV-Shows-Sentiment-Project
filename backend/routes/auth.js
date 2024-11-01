const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const z = require("zod");
const prisma = require("../db/index");
const validateBody = require("../middleware/validate")


//Add these schemas to the auth.js in the routes folder above the module.exports line
//This is the general auth schema that we will use with both the login and signup routes
const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, "Password must be at least 4 characters or more"),
});

//This is the signup schema. It extends off of the authSchema since the authSchema already has the email and password
//With signup, we need email, password, and username. For the confirmPassword, that is more to make sure that the password the client sends matches their original password
//The confirmPassword is NOT used in the signup route's logic. ONLY in the validation.
const signupSchema = authSchema.extend({
    username: z.string(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

module.exports = function () {
  const router = express.Router();

  //Signup Route
  router.post("/signup", validateBody(signupSchema), async function (req, res) {
    const { password, email, username } = req.body;
    try {
      const hashedPassword = await argon2.hash(password);
      const user = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          username: username,
        },
      });
      if (user) {
        res.status(201).json({
          success: true,
        });
      } else {
        res.status(500).status(500).json({
          success: false,
          message: "Something went wrong",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  });

  //Login Route
  router.post("/login", validateBody(authSchema), async function (req, res) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user || !(await argon2.verify(user.password, password))) {
      res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(200).json({
      success: true,
      token,
    });
  });
  return router
};
