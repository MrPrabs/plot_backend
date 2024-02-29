// user.router.ts
import { Router } from 'express'; 
import { getUsers } from '../controllers/user.controller';
import { getUserById } from '../controllers/user.controller';
// import { createNewUser } from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
// userRouter.post('/', createNewUser);

export default userRouter;
