import express from 'express';
import { authRouter } from './auth.router.js';
import { usersRouter } from './users.router.js';
import { resumesRouter } from './resumes.router.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
// requireAccessToken 미들웨어 적용 > 인증 성공 시 req.user 전달
apiRouter.use('/resumes', requireAccessToken, resumesRouter);

export { apiRouter };
