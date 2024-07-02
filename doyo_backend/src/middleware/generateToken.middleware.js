const { configs } = require("../config/index");
const jwt = require("jsonwebtoken");

module.exports.generateToken = (payload, validity) => {
    try {
        const token = jwt.sign(payload, configs.SECRET_KEY, { expiresIn: validity || "5d" });
        return token;
    } catch (error) {
        throw error;
    }
};
