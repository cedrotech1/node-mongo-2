const express= require('express');
const router= express.Router();
const { getallusers,createusers,login }= require('../controllers/userController');
const protect= require('../midlewares/protect');
// Route to get all users
router.get('/',protect, getallusers);
router.post('/', createusers);
router.post('/login', login);




module.exports= router;