// resume.repository.js
import { prisma } from "../utils/prisma/index.js";

class ResumesRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  createResume = async (userId, title, content) => {
    // 필수 필드 검증
    if (!userId || !title || !content === undefined) {
      throw new Error("필수 필드가 누락되었습니다.");
    }

    const createdResume = await this.#orm.resume.create({
      data: {
        userId: userId,
        title: title,
        content: content,
      },
    });

    return createdResume;
  };

  getResumesById = async (userId) => {
    // 유저의 이력서들 존재 여부 확인
    const resumes = await this.#orm.resume.findMany({
      where: { userId: parseInt(userId, 10) },
    });

    if (!resumes || resumes.length === 0) {
      throw new Error("이력서가 존재하지 않습니다.");
    }

    const getResumes = await this.#orm.resume.findMany({
      where: { userId },
    });
    return getResumes;
  };

  getResume = async (userId, resumeId) => {
    // 특정 이력서 존재 여부 확인
    const resume = await this.#orm.resume.findFirst({
      where: { userId: userId, resumeId: parseInt(resumeId, 10) },
    });

    const getResumes = await this.#orm.resume.findMany({
      where: { userId },
    });
    return getResumes;
  };

  updateResume = async (userId, resumeId, title, content) => {
    // 리뷰 존재 여부 확인
    const resume = await this.#orm.resume.findUnique({
      where: { userId: userId, resumeId: parseInt(resumeId, 10) },
    });
    if (!resume) {
      throw new Error("이력서가 존재하지 않습니다.");
    }

    // 수정할 필드 검증
    if (!title && !content) {
      throw new Error("수정할 내용을 입력해야 합니다.");
    }

    const updatedResume = await this.#orm.resume.update({
      where: {
        resumeId: parseInt(resumeId, 10),
      },
      data: {
        ...(content && { content }),
        ...(star && { star }),
      },
    });

    return updatedResume;
  };

  deleteResume = async (resumeId, userId) => {
    const resume = await this.#orm.resume.findUnique({
      where: { userId: userId, resumeId: parseInt(resumeId, 10) },
    });
    if (!resume) {
      throw new Error("삭제할 이력서가 없습니다.");
    }

    const deletedResume = await this.#orm.resume.delete({
      where: {
        resumeId: parseInt(resumeId, 10),
      },
    });

    return deletedResume;
  };
}

export default new ResumesRepository(prisma);
