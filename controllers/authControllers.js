const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if email exists in database (find one)
    const findUser = await User.findOne({ email });
    // send back a response : status 400 (bad request) , msg "user does not exist"
    if (!findUser) {
      return res.status(400).json({ msg: "User doesn't exist" });
    }
    // if user exists : check if password is correct (compare)
    const isMatch = await bcrypt.compare(password, findUser.password);
    // send back a response : status 400 (bad request) , msg "bad credentials"
    if (!isMatch) {
      return res.status(400).json({ msg: "Bad credentials" });
    }
    // generate a token
    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ msg: "Login successful", token: token });
    
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // email has to be unique : check if email exists in database (find one)
    // findOne() returns first document that matches the query criteria or null if no document matches
    // send back a response : status 400 (bad request) , msg "user already exists"
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // password has to be hashed : bcrypt (hash)
    const hashedPassword = await bcrypt.hash(password, 10);
    // create a new user : create
    const newUser = new User({ ...req.body, password: hashedPassword });
    // save user to database
    // send back a response : status 201 (created) , msg "user created"
    // if user is not created : status 500 (server error) , msg "something went wrong"
    newUser.save((err) => {
      if (err) {
        return res.status(500).json({ msg: "Something went wrong" });
      }
      res.status(201).json({ msg: "User created" });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  login,
  register,
};
