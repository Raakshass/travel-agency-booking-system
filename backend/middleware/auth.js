module.exports = (req, res, next) => {
    const { username, password } = req.headers;

    // Simple hardcoded admin credentials (replace this later with proper auth)
    if (username === "admin" && password === "admin123") {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized: Invalid admin credentials" });
    }
};
