const Like = require("../models/like");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.toggleLike = async function (req, res) {
  try {
    let likeable;
    let deleted = false;

    if (req.query.type == "Post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      console.log("hjkl");
      likeable = await Comment.findById(req.query.id).populate("likes");
    }
    //check if like is already exist
    let existLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    //console.log(likeable, "**************** ", existLike);
    //if like already exist than delete it
    if (existLike) {
      likeable.likes.pull(existLike._id);
      likeable.save();
      existLike.remove();
      deleted = true;
    } else {
      //not exist than create it
      let newLike = await Like.create({
        user: req.user.id,
        likeable: req.query.id,
        onModel: req.query.type,
      });

      likeable.likes.push(newLike._id);
      likeable.save();

      // console.log("HHHHHHHHHHHHHHH", likeable.likes.length);
    }

    return res.json(200, {
      message: "Request successful!",
      data: {
          deleted: deleted
      }
  })
  } catch (error) {
    console.log(error);
    res.json(500, {
      message: "Internal Server Error",
    });
  }
};
