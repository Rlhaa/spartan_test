import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';
import { MIN_RESUME_LENGTH } from '../../constants/resume.constant.js';

const schema = Joi.object({
  // title 문자열이여야 함
  title: Joi.string(),
  // content 문자열, 최소길이 조건 있음
  content: Joi.string().min(MIN_RESUME_LENGTH).messages({
    //최소길이 조건 불만족 시 수정 요청 메시지 설정
    'string.min': MESSAGES.RESUMES.COMMON.CONTENT.MIN_LENGTH,
  }),
})
// schema는 객체. 객체가 최소 1개의 필드는 값을 가져야 한다.
  .min(1)
  // 위 조건을 만족하지 않을 때 수정 요청 메시지 설정
  .messages({
    'object.min': MESSAGES.RESUMES.UPDATE.NO_BODY_DATA,
  });

export const updateResumeValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
