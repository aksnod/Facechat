const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
      if (req.xhr) {
        // Similar for comments to fetch the user's id!
        comment = await comment.populate("user", "name").execPopulate();

        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Comment created!",
        });
      }

      req.flash("success", "commented");
      res.redirect("/");
    }
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    if (req.user.id == comment.user) {
      let postId = comment.post;
      comment.remove();

      let post = Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      // send the comment id which was deleted back to the views
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Post deleted",
        });
      }
      req.flash("success", "comment is deleted");
      return res.redirect("back");
    } else {
      req.flash("error", "you can not delete");
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};
