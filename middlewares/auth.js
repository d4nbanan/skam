const {validateAccessToken} = require('../controllers/validateToken');
const User = require('../schemas/User');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader){
            res.status(401).json({message: "Error authorization"});
            return next(new Error("Error authorization"));
        }

        const accessToken = authHeader.split(" ")[1];
        if(!accessToken){
            res.status(401).json({message: "Error authorization"});
            return next(new Error("Error authorization"));
        }

        const userData = validateAccessToken(accessToken);
        if(!userData){
            res.status(401).json({message: "Error authorization", isExpired: true});
            return next(new Error("Error authorization"));
        }

        // req.user = userData;

        // console.log(userData);

        const user = await User.findById(userData.id);
        req.user = user;

        next();
    } catch (err) {
        res.status(401).json({message: "Error authorization"});
        return next(new Error("Error authorization"));
    }
}

module.exports = auth;