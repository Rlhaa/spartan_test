import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';
import { prisma } from '../utils/prisma.util.js';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  HASH_SALT_ROUNDS,
} from '../constants/auth.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';

const authRouter = express.Router();

// 회원가입 API
authRouter.post('/sign-up', signUpValidator, async (req, res, next) => {
  try {
    // 클라이언트로 부터 받은 입력값 중 mail, password, name 추출
    const { email, password, name } = req.body;

    // 가져온 email을 조건으로 user 데이터를 찾아 existedUser 변수에 할당
    const existedUser = await prisma.user.findUnique({ where: { email } });

    // 이메일이 중복된 경우
    if (existedUser) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        status: HTTP_STATUS.CONFLICT,
        message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
      });
    }
    // 가져온 password를 bcrypt 라이브러리로 암호화
    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    // email, hashedPassword, name을 user 테이블에 생성
    const data = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // 로그에 남는 비밀번호 정보에 undefined 씌우기 > 보안 상 이점
    data.password = undefined;

    return res.status(HTTP_STATUS.CREATED).json({
      status: HTTP_STATUS.CREATED,
      message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
      data,
    });
  } catch (error) {
    next(error);
  }
});

// 로그인 API
authRouter.post('/sign-in', signInValidator, async (req, res, next) => {
  try {
   // 클라이언트로 부터 받은 입력값 중 email, password 추출
    const { email, password } = req.body;
    // email로 기존 user 테이블에서 같은 eamil 가진  유저 데이터 변수에 저장
    const user = await prisma.user.findUnique({ where: { email } });

    // 유저 데이터의 password와 입력받은 password
    const isPasswordMatched =
    // bcrypt.compareSync bcrypt 라이브러리에서 제공하는 동기식 함수
    // 주어진 비밀번호와 해시된 비밀번호를 비교하는 데 사용
    //user가 존재한다면 , password와 user.password를 비교
    // 결과를 isPasswordMatched에 할당
      user && bcrypt.compareSync(password, user.password);

      // isPasswordMatched가 false일 때 오류 처리
    if (!isPasswordMatched) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
      });
    }

    // payload 객체 생성, key = id, value = user.id
    const payload = { id: user.id };
    // jwt.sign 메서드 사용, payload 기반으로 엑세스 토큰 생성
    // 생성한 토큰을 accessToken 변수에 할당
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
});

export { authRouter };
