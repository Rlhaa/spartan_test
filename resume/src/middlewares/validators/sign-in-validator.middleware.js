import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';

// joi 유효성 검증 스키마 정의
const schema = Joi.object({
  // email은 문자열, 이메일 형식인지, 존재하는지
  email: Joi.string().email().required().messages({
    // 존재 x > 이메일 입력 요청 메시지 설정
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    // 이메일 형식 x > 이메일 형식으로 작성 요청 메시지 설정
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }),
  // password는 문자열, 존재하는지
  password: Joi.string().required().messages({
    // 존재 x > 패스워드 입력 요청 메시지 설정
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQURIED,
  }),
});
// signInValidator라는 비동기 함수 정의
export const signInValidator = async (req, res, next) => {
  try {
    // 위에서 정의한 schema라는 joi 유효성 검사 스키마를 통해 요청 본문을 검증
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
