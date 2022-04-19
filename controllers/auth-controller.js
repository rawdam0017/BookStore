const User = require("../model/User");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const jwtSecret = "0345857bcb963a328815694b259516725814c2b40825919977e748bdc040018e0dece2"


exports.register = async (req, res, next) => {
    const { username, password, name, email, Gender, Birthday } = req.body
    if (password.length < 6) {
        return res.status(404).json({ message: "Password less than 6 characters" })
    }
    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
            username,
            password: hash,
            name,
            email,
            Gender,
            Birthday
        })
            .then((user) => {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign(
                    { id: user._id, username, role: user.role },
                    jwtSecret,
                    {
                        expiresIn: maxAge, // 3hrs in sec
                    }
                );
                // res.cookie("jwt", token, {
                //     httpOnly: true,
                //     maxAge: maxAge * 1000, // 3hrs in ms
                // });
                res.status(201).json({
                    message: "User successfully created",
                    // user: user._id,
                    token
                });
            })
            .catch((error) =>
                res.status(400).json({
                    message: "User not successful created",
                    error: error.message,
                })
            );
    });
};




exports.login = async (req, res, next) => {
    const { email, password } = req.body
    console.log(email, password)
    if (!email || !password) {
        return res.status(400).json({
            message: "Username or Password not present",
        })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(401).json({
                message: "Login not successful",
                error: "User not found",
            })
        } else {
            // comparing given password with hashed password
            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign(
                        { id: user._id, email, role: user.role },
                        jwtSecret,
                        {
                            expiresIn: maxAge, // 3hrs in sec
                        }
                    );
                    // res.cookie("jwt", token, {
                    //     httpOnly: true,
                    //     maxAge: maxAge * 1000, // 3hrs in ms
                    // });
                    res.status(201).json({
                        message: "User successfully Logged in",
                        token
                        // user: user._id,
                        // username: user.username

                    });
                } else {
                    res.status(400).json({ message: "Login not succesful" });
                }
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}


exports.update = async (req, res, next) => {
    const { role, id } = req.body;
    // First - Verifying if role and id is presnt
    if (role && id) {
        // Second - Verifying if the value of role is admin
        if (role === "admin") {
            // Finds the user with the id

            await User.findById(id)
                .then((user) => {
                    // Third - Verifies the user is not an admin
                    if (user.role !== "admin") {
                        user.role = role;
                        user.save((err) => {
                            //Monogodb error checker
                            if (err) {
                                res
                                    .status("400")
                                    .json({ message: "An error occurred", error: err.message });
                                process.exit(1);
                            }
                            res.status("201").json({ message: "Update successful", user });
                        });
                    } else {
                        res.status(400).json({ message: "User is already an Admin" });
                    }
                })
                .catch((error) => {
                    res
                        .status(400)
                        .json({ message: "An error occurred", error: error.message });
                })
        }
    }
};


exports.deleteUser = async (req, res, next) => {
    const { id } = req.body
    await User.findById(id)
        .then(user => user.remove())
        .then(user =>
            res.status(201).json({ message: "User successfully deleted", user })
        )
        .catch(error =>
            res
                .status(400)
                .json({ message: "An error occurred", error: error.message })
        )
}

exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.role !== "admin") {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}

exports.userAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" })
            } else {
                if (decodedToken.role !== "Basic") {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" })
    }
}