let users = [];
let userId = 1;

const createUser =  async  (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and Email are required' });
    }

    const duplicate = users.some(user => user.email === email);
    if (duplicate) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = {
      id: userId++,
      name,
      email
    }
    users.push(newUser);
    return res.status(201).json({ message: 'User Created Successfully', user: newUser });

  } catch (err) {
    return res.status(400).json({erroe : err.message });
  }
}

const getAllUsers =  async  (req, res) => {
  try {
    return res.json(users);
  } catch (err) {
    return res.status(400).json({erroe : err.message });
  }
}

const getUserById = async (req,res) => {
  try {
    const {id} = req.params;
    const user = users.find((u)=> u.id === parseInt(id));

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(user);

  } catch (err) {
    return res.status(400).json({erroe : err.message });
  }
}

const updateUser = async (req,res) => {
  try {
    const {id} = req.params;
    const { name, email } = req.body;

    const user = users.find((u)=> u.id === parseInt(id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if(name) user.name = name;
    if(email) user.email = email;

    return res.status(201).json({ message : 'user Updated ZSuccessfully' , user });
  } catch (err) {
    return res.status(400).json({erroe : err.message });
  }
}

const deleteUser =  async  (req, res) => {
  try {
    const { id } = req.params;
    const userIndex = users.findIndex((u) => u.id === parseInt(id));

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    users.splice(userIndex, 1);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}