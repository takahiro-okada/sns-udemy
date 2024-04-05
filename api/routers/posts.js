const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 呟き投稿用API
router.post("/post", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "内容が空です" });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: 1,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "エラーが発生しました" });
  }
});

// 最新呟き用API
router.get("/get_latest_post", async (req, res) => {
  try {
    const latestPosts = await prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
    });
    return res.json(latestPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "エラーが発生しました" });
  }
});

module.exports = router;
