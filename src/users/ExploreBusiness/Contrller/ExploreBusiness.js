const Heria = require("../Db/ExploreBusiness");
const getUserById = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await Heria.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getUserByEmail = async (req, res) => {
    const email = req.params.email;

    try {
        const user = await Heria.findOne({ email });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user by email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const createUser = async (req, res) => {
    try {
      const userData = req.body;
      const newUser = new Heria(userData);
      await newUser.save();
  
      console.log(newUser);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
  
      // Check for validation errors
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation Error', details: error.message });
      }
  
      // Check for duplicate key error
      if (error.code === 11000) {
        return res.status(409).json({ error: 'Duplicate Key Error', details: error.keyValue });
      }
  
      // If it's not a validation or duplicate key error, send a generic error message
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


// const createUser = async (req, res) => {
//     const userData = req.body;

//     try {
//         // Validate user data before attempting creation
//         const validationErrors = await Heria.validate(userData);
//         if (validationErrors) {
//             return res.status(400).json({ error: 'Validation Error', details: validationErrors });
//         }

//         const newUser = await Heria.create(userData);
//         res.status(201).json(newUser);
//         console.log('Received POST request:', req.body);

//     } catch (error) {
//         if (error.name === 'ValidationError') {
//             // Mongoose validation errors already handled in the validation step
//         } else if (error.name === 'MongoError' && error.code === 11000) {
//             // Handle duplicate email error specifically
//             return res.status(409).json({ error: 'Duplicate Email' });
//         } else {
//             // Handle other unexpected errors, log for debugging, and send a generic error response
//             console.error('Internal server error:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     }
// };

const renderDeleteConfirmation = async (req, res) => {
    const email = req.params.email;
  
    try {
      const user = await Heria.findOne({ email });
      res.render('BusniessExploresDEl', { user });
    } catch (error) {
      console.error('Error fetching user for delete confirmation:', error);
      res.render('deleteConfirmation', { error: 'Internal Server Error' });
    }
  };


  const RederHomePage = async (req, res) => {
      res.render('BusnisPageHome3');
    }

const deleteUserById = async (req, res) => {
    const userId = req.params.userId;

    try {
        const deletedUser = await Heria.findByIdAndDelete(userId);
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUserByEmail = async (req, res) => {
    const email = req.params.email;

    try {
        const deletedUser = await Heria.findOneAndDelete({ email });
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// Controller to update a user by ID
const updateUserById = async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    try {
        const updatedUser = await Heria.findByIdAndUpdate(userId, updatedUserData, { new: true });
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle validation errors
            const validationErrors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ error: 'Validation Error', details: validationErrors });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};


const updateUserByEmail = async (req, res) => {
    const email = req.params.email;
    const updatedUserData = req.body;
    try {
      const updatedUser = await Heria.findOneAndUpdate(
        { email },
        updatedUserData,
        { new: true } // Return the updated document
      );
  
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Handle validation errors
        const validationErrors = Object.values(error.errors).map(err => err.message);
        res.status(400).json({ error: 'Validation Error', details: validationErrors });
      } else {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Errorin' });
      }
    }
  };
  
  const getAllUsers = async (req, res) => {
    try {
      const users = await Heria.find();
      res.render('BusinessExplosre', { users }); // Render the EJS template with users data
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).render('error', { error: 'Internal Server Error' }); // Render an error template
    }
  };
  


  

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById,
    updateUserById,
    getUserByEmail,
    deleteUserByEmail,
    updateUserByEmail,
    renderDeleteConfirmation,
    RederHomePage

};
