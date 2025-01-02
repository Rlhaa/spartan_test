import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';
import { MIN_PASSWORD_LENGTH } from '../../constants/auth.constant.js';
// 유효성 검사 joi 유효성 검사 스키마 정의
const schema = Joi.object({
  // email은 문자열, 이메일 형식, 존재해야함
  email: Joi.string().email().required().messages({
    // 존재 x일때 이메일 입력 요청 메시지 설정
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    // email 형식 x 일때 이메일 형식으로 수정 요쳥 메시지 설정
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }),
  // password는 문자열, 존재해야함, 최소 길이 MIN_PASSWORD_LENGTH로 설정
  password: Joi.string().required().min(MIN_PASSWORD_LENGTH).messages({
    // 존재 x일때 password 입력 요청 메시지 설정
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQURIED,
    // 최소길이 조건 불만족 시 수정 요청 메시지 설정
    'string.min': MESSAGES.AUTH.COMMON.PASSWORD.MIN_LENGTH,
  }),
  // passwordConfirm은 문자열, 존재해야함, password필드 값과 값이 동일해야함
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
     // 존재 x일때 passwordConfirm 입력 요청 메시지 설정
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.REQURIED,
    // any.only : 조건 값과 일치하지 않을 때 사용하는  오류 메시지 키
    // 조건 필드 값과 값이 동일하지 않을 때 수정 요청 메시지 설정
    'any.only': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD,
  }),
  // name은 문자열, 존재해야함
  name: Joi.string().required().messages({
    // 존재 x일때 name 입력 요청 메시지 설정
    'any.required': MESSAGES.AUTH.COMMON.NAME.REQURIED,
  }),
});
// signUpValidator 라는 회원가입, 로그인 시 거치는 미들웨어 비동기 함수 정의
export const signUpValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
