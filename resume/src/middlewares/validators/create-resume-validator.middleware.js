// validarots = 유효성
// cosntant 폴더에서 정리한 변수들을 활용해 유효성 검사를 하는 부분을
// 따로 모아둔 듯?

// joi >> express.js 와 함께 사용하느 데이터 검증, 유효성 검사 라이브러리
import Joi from 'joi';

// 각종 성공, 실패, 오류 메시지 정리한 constant 파일 임포트
import { MESSAGES } from '../../constants/message.constant.js';

// 이력서 최소길이 (150) 변수 임포트
import { MIN_RESUME_LENGTH } from '../../constants/resume.constant.js';

//  joi 스키마 정의
const schema = Joi.object({
  // title은 문자열, 필수로 존재해야함
  // any.required >> 이 필드는 필수로 존재해야 한다는 조건, 변수 아닌 메서드? > 이름 정해져 있음
  title: Joi.string().required().messages({
    // 조건 x일 때(title이 입력되지 않았을때) 아래 메시지 전달
    // MESSAGES.RESUMES.COMMON.TITLE.REQUIRED > 제목 없다는 메시지
    'any.required': MESSAGES.RESUMES.COMMON.TITLE.REQUIRED,
  }),
  //content는 문자열, 최소 길이는 MIN_RESUME_LENGTH(150), 필수로 존재해야함
  content: Joi.string().min(MIN_RESUME_LENGTH).required().messages({
    // 존재하지 않을 때 메시지 설정
    'any.required': MESSAGES.RESUMES.COMMON.CONTENT.REQUIRED,
    // 최소 길이 조건 만족 x 일 때 
    'string.min': MESSAGES.RESUMES.COMMON.CONTENT.MIN_LENGTH,
  }),
});
// createResumeValidator라는 비동기 함수 정의
export const createResumeValidator = async (req, res, next) => {
  try {
    // 위에서 정의한 schema라는 joi 유효성 검사 스키마를 통해 요청 본문을 검증
    // validateAsync : joi 라이브러리의 메서드. 스키마를 기반으로 데이터 유효성 검사 진행
    await schema.validateAsync(req.body);
    // 성공 시 다음 ㄱㄱ
    next();
  } catch (error) {
    // 실패 시 에러 표시
    next(error);
  }
};
