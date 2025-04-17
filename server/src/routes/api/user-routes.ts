import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/user.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

// GET /users/:userid - Get a user by ID
router.get('/:userid', async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const user = await User.findByPk(_id);
    if(user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

// POST /users - Create a new volunteer
router.post('/', async (req: Request, res: Response) => {
  const { userName } = req.body;
  try {
    const newUser = await User.create({
      userName
    });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});

// PUT /volunteers/:userId - Update a volunteer by ID
router.put('/:userId', async (req: Request, res: Response) => {
  const { _id } = req.params;
  const { userName } = req.body;
  try {
    const user = await User.findByPk(_id);
    if(user) {
      user.userName = userName;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});

// DELETE /users/:userId - Delete a volunteer by ID
router.delete('/:userId', async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const user = await User.findByPk(_id);
    if(user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

export { router as userRouter };
