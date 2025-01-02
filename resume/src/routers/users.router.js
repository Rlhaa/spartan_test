import express from 'express';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

const usersRouter = express.Router();

// 
usersRouter.get('/me', requireAccessToken, (req, res, next) => {
  try {
    // 인증 미들웨어 통과 후 얻은 유저 정보
    // data라고 선언
    const data = req.user;

    return res.status(HTTP_STATUS.OK).json({
      // 상태코드 200
      status: HTTP_STATUS.OK,
      // 정보 조회 성공 메시지
      message: MESSAGES.USERS.READ_ME.SUCCEED,
      // data
      data,
    });
  } catch (error) {
    next(error);
  }
});

export { usersRouter };
