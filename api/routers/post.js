const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 呟き投稿用API
router.post("/post", async (req, res) => {
  const { content } = req.body;

  if(!content) {
    return res
      .status(400)
      .json({message: "内容が空です"});
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authourId: 1,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "エラーが発生しました"});
  }

});

// 最新呟き用API
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   if(!user) {
//     return res
//       .status(401)
//       .json({erro:"ユーザーは存在しません"})
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if(!isPasswordValid) {
//     return res
//       .status(401)
//       .json({error: "パスワードが間違っています"});
//   }

//   const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {
//     expiresIn: "1d",
//   });

//   return res.json({ token });
  
// });

module.exports = router;