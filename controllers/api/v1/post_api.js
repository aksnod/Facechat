const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .populate("user")
    .sort("-createdAt")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });
  return res.json(200, {
    meassage: "Lists of posts",
    posts: posts,
  });
};
module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    //when two id need to compare than for converting to string, _id write id
    if (post.user == req.user.id) {
      {
        post.remove();
        await Comment.deleteMany({ post: req.params.id });

        res.json(200, {
          meassage: "Post and associated comments are deleted",
        });
      }
    } else {
      return res.json(401, {
        meassage: "You can not delete",
      });
    }
  } catch (error) {
    return res.json(501, {
      meassage: "Internal server error",
    });
  }
};
