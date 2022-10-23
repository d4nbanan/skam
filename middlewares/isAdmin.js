const isAdmin = (req, res, next) => {
    try {
        if(req.user.role === 'admin' || req.user.role === 'moderator'){
            console.log(req.path);
        } else {
            res.status(401).json({message: "No access"});
            return next(new Error("No access"));
        }
        next();
    } catch (err) {
        return next(new Error("No access"));
    }
}

module.exports = isAdmin;