import express from 'express';
import { register } from '../../../controllers/AuthController';

const router = express.Router();

// Register User
router.post('/register', register);

// Login User
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findByCredentials(email, password);
//     const token = await user.generateAuthToken();
//     res.send({ user, token });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

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

export { router as authRouter };
