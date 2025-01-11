const express = require("express");
const {createUser,getAllUsers,getUserById,updateUser,deleteUser,} = require("../controllers/userController");

const router = express.Router();

router.post("/create", createUser);
router.get("/view-all", getAllUsers);
router.get("/view/:id", getUserById);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
