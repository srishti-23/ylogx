const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin"); // Admin Model
const Candidate = require("../models/candidate"); // Candidate Model

// ✅ REGISTER FUNCTION
exports.register = async (req, res) => {
  const { fullname, email, password, role } = req.body;

  try {
    if (!["Admin", "Candidate"].includes(role)) {
      return res
        .status(400)
        .json({ error: "Invalid role. Choose 'Admin' or 'Candidate'." });
    }

    const UserModel = role === "Admin" ? Admin : Candidate;
    console.log(role);
    const tableName = role === "Admin" ? "Admin" : "Candidate"; // ✅ Fix here
    console.log(`Inserting into table: ${tableName}`); // ✅ Fix here

    const existingUser = await UserModel.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name: fullname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: `New ${role} registered successfully`,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

//  LOGIN FUNCTION
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = null;
    let role = null;

    // Check in Admins table first
    user = await Admin.findOne({ where: { email } });
    if (user) role = "Admin";
    console.log(role);

    // If not found in Admins, check in Candidates table
    if (!user) {
      user = await Candidate.findOne({ where: { email } });
      if (user) role = "Candidate";
    }

    console.log(`Checking user in table: ${role ? role : "Unknown"}`);

    // If user is not found
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, role: role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // return res.status(200).json({
    //   message: "Login successful",
    //   token,
    //   user: {
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     role: role,
    //   },
    // });
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 86400000, // 1 day
        secure: false, // Set true in production for HTTPS
        sameSite: "Strict",
        path: "/",
      })
      .json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: role,
        },
      });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// exports.getUserDetails = async (req, res) => {
//   try {
//     console.log("Decoded User from Token:", req.user); // Log to check incoming user data

//     const { id, role } = req.user; // Extracted from JWT token (authMiddleware)

//     if (!id || !role) {
//       return res.status(400).json({ error: "Invalid token data" });
//     }

//     let user = null;
   
//     if (role === "Admin") {
//       user = await Admin.findByPk(id, {
//         attributes: ["id", "name", "email", "createdAt", "role"],
//       });
//     } else if (role === "Candidate") {
//       user = await Candidate.findByPk(id, {
//         attributes: ["id", "name", "email", "createdAt", "role"],
//       });
//     } else {
//       return res.status(400).json({ error: "Invalid user role" });
//     }

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     console.log("Fetched User:", user); // Log user object before sending response

//     return res.status(200).json({ user });
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     return res.status(500).json({ error: "Server error" });
//   }
// };
// controllers/userController.js
exports.getUserDetails = async (req, res) => {
  try {
    const { id, role } = req.user; // Extracted from JWT token (authMiddleware)

    let user = null;

    if (role === "Admin") {
      user = await Admin.findByPk(id, {
        attributes: ["id", "name", "email", "role", "createdAt"],
      });
    } else if (role === "Candidate") {
      user = await Candidate.findByPk(id, {
        attributes: ["id", "name", "email", "role", "createdAt"],
      });
    } else {
      return res.status(400).json({ error: "Invalid user role" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


