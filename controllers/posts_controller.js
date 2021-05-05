const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    req.flash("success", "post is published!");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
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
        req.flash("success", "post ans associated comments are deleted");
        return res.redirect("back");
      }
    } else {
      req.flash("error", "you can not delete post");
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};
