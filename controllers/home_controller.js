const { populate } = require("../models/post");
const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id',25);

  // Posts.find({},function(err,posts){
  //     return res.render('home',{
  //         title:"Codian | Home",
  //         allPost:posts
  //     });
  // })

  // }

  //populate the user for further use
  try {
    let posts = await Post.find({})
      .populate("user")
      .sort("-createdAt")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});

    return res.render("home", {
      title: "Codian | Home",
      posts: posts,
      allUsers: users,
    });
  } catch (error) {
    console.log("error ", error);
    return;
  }
};
