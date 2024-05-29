import generateTokenAndSetCookie from "../middleware/generateToken.js";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs"
export const signup = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const user =  await User.findOne({ username });
    if (user) {
        return 
       res
        .status(400)
        .json({ error: "User with this Username already exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser =  new User({
        name,
        username,
        email,
        password: hashedPassword,
      });
      if (newUser) {
        generateTokenAndSetCookie(newUser._id , res);
        await newUser.save();
         res.status(200).json({
            id : newUser._id , 
            username : newUser.username ,
            name : newUser.name ,
            email : newUser.email ,
            message : "User created successfully"
         });
      }
      else{
        res.status(400).json({ error: "Invalid user data" });
      }
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const login= async(req ,res) =>{
    try {
       const {username ,password} = req.body;
       const user = await User.findOne({username});
       const isPasswordCorrect = await bcrypt.compare(password ,user?.password || "");
       if(!user || !isPasswordCorrect){
          return res.status(400).json({error: "Invalid Username or password"});
       }
       generateTokenAndSetCookie(user._id ,res);
       res.status(200).json({
          _id : user._id ,
          username : user.username
        });
          
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
      
  }
  export const logout= (req ,res) =>{
    try {
		res.cookie("jwt" , "" ,{maxAge:0});
		res.status(200).json({message:"Logged out succesfully"});
	} catch (error) {
		console.log("Error in logout controller", error.message);
	    res.status(500).json({ error: "Internal Server Error" });
	}
}