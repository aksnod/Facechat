const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (err) {
    console.log("error: ", err);
    return;
  }
};
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    //when two id need to compare than for converting to string, _id write id
    if (post.user == req.user.id) {
      {
        post.remove();
        await Comment.deleteMany({ post: req.params.id });
        return res.redirect("back");
      }
    } else return res.redirect("back");
  } catch (error) {
    console.log("Error: ", error);
    return;
  }
};
