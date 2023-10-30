import express from 'express';

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// router.post('/logout', async (req, res) => {
//   try {
//     const { user, token } = req.body;
//     user.tokens = user.tokens.filter((t) => t.token !== token);
//     await user.save();
//     res.send();
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

export { router as userRouter };
  