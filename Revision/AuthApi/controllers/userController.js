let users = [];
let userIdCounter = 1;

const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  const newUser = { id: userIdCounter++, name, email };
  users.push(newUser);

  res.status(201).json({ message: "User created successfully.", user: newUser });
};

const getAllUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.json(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (name) user.name = name;
  if (email) user.email = email;

  res.json({ message: "User updated successfully.", user });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found." });
  }

  users.splice(userIndex, 1);

  res.json({ message: "User deleted successfully." });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
