const Users=require("../model/users.model");
const bcryptjs=require('bcryptjs');
const {Conflict,Unauthorized}=require("http-errors");
const {generateToken }=require('../middleware/generateToken.middleware');
const {aggregationData}=require('../helper/pagination.helper')
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
module.exports.getAlluser=async({search,perPage,pageNo,currentuserId})=>{
    try {
        let args=[];
        args.push({
            $sort:{
                createdAt:-1
            }
        });
        if(search){
           args.push({
            ["$addFields"]:{
                ["searchNameMatch"]:{
                    ["$regexMatch"]:{
                        ["input"]:"$name",
                        ["regex"]:search,
                        ["options"]:"i"
                    }
                }
            }
           },
           {
            ["$match"]: {
              ["$expr"]: {
                ["$or"]: [
                  {
                    $eq: ["$searchNameMatch", true],
                  },
                ],
              },
            },
          }
        )
        }
        args.push({
            $match: {
              _id: {
                $ne:currentuserId  // Assuming currentUser is an object with _id property
              }
            }
          });

    const allusers=await aggregationData({
        model: Users,
        per_page: Number(perPage),
        pageNo: Number(pageNo),
        args: args,
        isTotalData: true,
    })
    return allusers
    } catch (error) {
        throw error
    }
}