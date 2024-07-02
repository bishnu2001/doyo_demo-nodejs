const Users=require("../model/users.model");
const bcryptjs=require('bcryptjs');
const {Conflict,Unauthorized}=require("http-errors");
const {generateToken }=require('../middleware/generateToken.middleware')
module.exports.signupUser=async({name,email,password,phoneNumber,countryCode,role})=>{
    try {
        const user=await Users.findOne({email});
        if(user) throw new Conflict("email already exist")
        const hashedPassword =await bcryptjs.hash(password,10)
        const createuser=await Users.create({
            name,email,password:hashedPassword,phoneNumber,countryCode,role
        })
        return createuser
    } catch (error) {
        throw error
    }
}
module.exports.signinUser=async({email,password})=>{
    try {
        const user = await Users.findOne({ email });
    if (!user) throw new Unauthorized("Invalid email or password");
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) throw new Unauthorized("Invalid email or password");
    const payload = {
      id: user._id,
    };
    const token = generateToken(payload, "10d");
    const { password: psd, ...userWithoutPassword } = user.toObject();
    return { user: userWithoutPassword, token };
    } catch (error) {
        throw error
    }
}