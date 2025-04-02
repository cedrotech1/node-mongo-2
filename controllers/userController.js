const User= require("../database/models/User");
const Bycrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");
exports.getallusers= async (req, res) => {
   try{
        // console.log(req.user);
        console.log(req.user.role);
        if(req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
        const users= await User.find({});
        return res.status(200).json(
            {
            message: "Users fetched successfully",
            users: users
        }
        );

   }catch(err){
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
   }
}

exports.createusers= async (req, res) => {
    try{
        const { firstname, lastname, email, password, role, address } = req.body;
        if(!firstname || !lastname) return res.status(400).json({ message: "Firstname and lastname required" });
         const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });


        const hashedpassword= await Bycrypt.hash(password, 10);
       let newUser= new User({
            firstname,
            lastname,
            email,
            password: hashedpassword,
            role,
            address
        });
        await newUser.save();
        // console.log(newUser);
         
         return res.status(200).json(
             {
             message: "User to create successfully",
             user: newUser
         }
         );
 
    }catch(err){
       console.error(err);
       return res.status(500).json({ message: "Internal server error" });
    }
 }
//  login function 
exports.login= async (req, res) => {

    try {
        const { email, password } = req.body;
        // varidation
        if (!email || !password) return res.status(400).json({ message: "Email and password required" });
        // check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(400).json({ message: "User email not exists" });
    
        // console.log(existingUser);
        // check password
        const isMatch= await Bycrypt.compare(password, existingUser.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // generate token
        const token = jwt.sign({ id: existingUser._id,firstname: existingUser.firstname }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        // console.log(token);
        // return user data and token
        return res.status(200).json({
            message: "User login successfully",
            token: token,
            user: {
                id: existingUser._id,
                firstname: existingUser.firstname,
                lastname: existingUser.lastname,
                email: existingUser.email,
                role: existingUser.role,
                address: existingUser.address
            },
           
        });
       
      
        
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
        
    }

}