const {signupUser,signinUser} =require("../business-logic/users.business-logic");
const { Conflict ,NotFound,Unauthorized} = require("http-errors");
const userSignup=async(req,res,next)=>{
    try {
        const{name,email,password,phoneNumber,countryCode,role}=req?.body;
        const createUser=await signupUser({name,email,password,phoneNumber,countryCode,role});
        res.json({
            success:true,
            message:"signup successfull",
            data:createUser
        })
    } catch (error) {
        if (error instanceof Conflict) {
            res.status(409).json({
                success: false,
                message: error.message
            });
        } else {
            // Handle other errors
            next(error);
        }
    }
}
const userSignin=async(req,res,next)=>{
    try {
        const {email,password}=req?.body;
        const user=await signinUser({email,password});
        if (!user) throw new NotFound("Something went wrong");
        res.set("Authorization", `Bearer ${user.token}`);
        res.json({
            success:true,
            messsage:"login successfull",
            data:user
        })
    } catch (error) {
        if (error instanceof Unauthorized) {
            res.status(401).json({ success: false, message: "Invalid email or password" });
        } else if (error instanceof NotFound) {
            res.status(404).json({ success: false, message: error.message });
        } else {
            next(error); // Pass other errors to the error handling middleware
        }
    }
}

module.exports.Usercontroller={
    userSignup,
    userSignin
}