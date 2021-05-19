const Posts = require("../../../models/post");
module.exports.index = async function (req, res) {
  let posts = await Posts.find({});
  return res.json(200, {
    message: "posts are appeared",
    posts: posts,
  });
};
