import express from 'express';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
import { prisma } from '../utils/prisma.util.js';
import { updateResumeValidator } from '../middlewares/validators/update-resume-validator.middleware.js';

const resumesRouter = express.Router();

// 이력서 생성
resumesRouter.post('/', createResumeValidator, async (req, res, next) => {
  try {
    // requireAccessToken 미들웨어 성공 시 req.user 받음
    const user = req.user;
    // title, content 추출
    const { title, content } = req.body;
    // 인증 받은 클라이언트 사용자의 user.id를 authorId에 할당
    const authorId = user.id;

    // 이력서 생성
    const data = await prisma.resume.create({
      data: {
        authorId,
        title,
        content,
      },
    });
    // 성공 시 메시지 처리
    return res.status(HTTP_STATUS.CREATED).json({
      status: HTTP_STATUS.CREATED,
      message: MESSAGES.RESUMES.CREATE.SUCCEED,
      data,
    });
  } catch (error) {
    next(error);
  }
});

// 이력서 목록 조회
resumesRouter.get('/', async (req, res, next) => {
  try {
    // requireAccessToken 미들웨어 성공 시 req.user 받음
    const user = req.user;
    // 인증 받은 클라이언트 사용자의 user.id를 authorId에 할당
    const authorId = user.id;
    // 쿼리 : http 요청 url에 포함된 추가적인 정보 ex) https://example.com/resumes?sort=asc&status=active
    // sort와 status는 쿼리 파라미터
    // sort=asc >> 이력서를 오름차순(ascending)으로 정렬하라는 요청
    // status=active >> 이력서의 상태가 'active'인 것만 필터링하라는 요청

    // 쿼리에서 sort 추출
    let { sort } = req.query;

    // sort 소문자로 변환
    // ? 옵셔널 체이닝 >> sort가 null, undefined인 경우 에러가 아닌 undefined를 반환
    sort = sort?.toLowerCase();
    
    // sort기 desc 도 아니고 asc도 아닌 경우
    if (sort !== 'desc' && sort !== 'asc') {
      // sort는 desc
      sort = 'desc';
    }


    let data = await prisma.resume.findMany({
      // authorId로 이력서 조회
      where: { authorId },
      // 정렬
      orderBy: {
        createdAt: sort,
      },
      // 작성자 정보도 포함
      include: {
        author: true,
      },
    });

    // 조회한 데이터를 이력서의 각 컬럼에 맵핑하여 개로운 객체 배열 생성
    data = data.map((resume) => {
      // 아래 데이터 반환
      return {
        id: resume.id,
        authorName: resume.author.name,
        title: resume.title,
        content: resume.content,
        status: resume.status,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      };
    });

    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
      data,
    });
  } catch (error) {
    next(error);
  }
});

// 이력서 상세 조회
resumesRouter.get('/:id', async (req, res, next) => {
  try {
    // requireAccessToken 미들웨어 성공 시 req.user 받음
    const user = req.user;
    // 인증 받은 클라이언트 사용자의 user.id를 authorId에 할당
    const authorId = user.id;
    // 파라미터에서 id 받아옴
    const { id } = req.params;

    let data = await prisma.resume.findUnique({
      // id는 +id는 같고, 동시에 authorId는 authorId 변수의 값과 같아야 한다는 조건
      where: { id: +id, 
               authorId,
             },
      // 작성자 정보도 포함
      include: { author: true },
    });

    // 조건에 맞는 resume 데이터가 없다면 실패 메시지 반환
    if (!data) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
      });
    }

    // data 객체 재선언
    data = {
      id: data.id,
      authorName: data.author.name,
      title: data.title,
      content: data.content,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
      data,
    });
  } catch (error) {
    next(error);
  }
});

// 이력서 수정
resumesRouter.put('/:id', updateResumeValidator, async (req, res, next) => {
  try {
    // requireAccessToken 미들웨어 성공 시 req.user 받음
    const user = req.user;
    // 인증 받은 클라이언트 사용자의 user.id를 authorId에 할당
    const authorId = user.id;
    // 파라미터에서 id 받아옴
    const { id } = req.params;

    const { title, content } = req.body;

    let existedResume = await prisma.resume.findUnique({
      // id는 +id는 같고, 동시에 authorId는 authorId 변수의 값과 같아야 한다는 조건
      where: { id: +id, authorId },
    });

    // 없을 때 처리
    if (!existedResume) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
      });
    }


    const data = await prisma.resume.update({
      // id는 +id는 같고, 동시에 authorId는 authorId 변수의 값과 같아야 한다는 조건
      where: { id: +id, authorId },
      data: {
        // title이 truthy하면 { title }로 기존값을 대체
        // title이 falsy하면 title(기존값)이 유지
        ...(title && { title }),
        // content가 truthy하면 { content }로 기존값을 대체
        // content가 falsy하면 content(기존값)이 유지
        ...(content && { content }),
      },
    });
    // 성공 처리 메시지
    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.RESUMES.UPDATE.SUCCEED,
      data,
    });
  } catch (error) {
    next(error);
  }
});

// 이력서 삭제
resumesRouter.delete('/:id', async (req, res, next) => {
  try {
    // requireAccessToken 미들웨어 성공 시 req.user 받음
    const user = req.user;
    const authorId = user.id;

    const { id } = req.params;

    let existedResume = await prisma.resume.findUnique({
      where: { id: +id, authorId },
    });

    if (!existedResume) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
      });
    }
    // id는 +id는 같고, 동시에 authorId는 authorId 변수의 값과 같아야 한다는 조건
    // 조건 만족하는 resume 데이터 삭제
    const data = await prisma.resume.delete({ where: { id: +id, authorId } });

    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.RESUMES.DELETE.SUCCEED,
      data: { id: data.id },
    });
  } catch (error) {
    next(error);
  }
});

export { resumesRouter };
