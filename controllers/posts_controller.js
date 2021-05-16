const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    if (req.xhr) {
      // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
      post = await post.populate("user", "name").execPopulate();

      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post created!",
      });
    }
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

        if (req.xhr) {
          return res.status(200).json({
            data: {
              post_id: req.params.id,
            },
            message: "post deleted",
          });
        }
        req.flash("success", "post and associated comments are deleted");
        return res.redirect("back");
      }
    } else {
      req.flash("error", "you can not delete this post");
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};
