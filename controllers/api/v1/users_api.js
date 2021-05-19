const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid User" + user,
      });
    }
    return res.json(200, {
      message: "sign in successfully, here is your token, keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), "codial", { expiresIn: 100000 }),
      },
    });
  } catch (err) {
    return res.json(501, {
      meassage: "Internal server error",
    });
  }
};
