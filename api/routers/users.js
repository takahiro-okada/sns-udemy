const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const isAuthenticated = require("../middlewares/isAuthenticated");

const prisma = new PrismaClient();

router.get("/find", isAuthenticated, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "ユーザーが見つかりません" });
    }
    res
      .status(200)
      .json({
        user: { id: user.id, username: user.username, email: user.email },
      });
  } catch (error) {
    res.status(500).json({ message: "エラーが発生しました" });
  }
});

module.exports = router;