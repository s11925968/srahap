import connectDb from '../../DB/connection.js';
import messageRouter from './message/message.router.js'
import authRouter from './auth/auth.router.js'
import userRouter from './user/user.router.js'
import cors from 'cors'
const initApp = (app,express) => {
  app.use(express.json());
  app.use('/messages',messageRouter);
  app.use('/auth',authRouter);
  app.use('/user',userRouter);
  app.use(cors());
  connectDb();
}

export default initApp;