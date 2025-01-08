// resume.service.js
import resumeRepository from "../repositories/resume.repository.js";

class ResumesService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  createResume = async (data) => {
    return await this.#repository.createResume(data);
  };

  getResumesById = async (data) => {
    const resume = await this.#repository.getResumesById({ data });

    return {
      resumeId: resume.id,
      userId: resume.userId,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };

  getResume = async (data) => {
    const resumes = await this.#repository.getResume({ data });
    return resumes.map((resume) => {
      return {
        resumeId: resume.id,
        userId: resume.userId,
        title: resume.title,
        content: resume.content,
        status: resume.status,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      };
    });
  };

  upadteResume = async (data) => {
    let existedResume = await this.#repository.getResume({ data });
    if (!existedResume) {
      throw new Error("이력서가 존재하지 않습니다.");
    }
    return await this.#repository.updateResume(data);
  };

  deleteResume = async (data) => {
    let existedResume = await this.#repository.getResume({ data });

    if (!existedResume) {
      throw new Error("이력서가 없습니다.");
    }
    return await this.#repository.deleteResume(data);
  };
}

export default new ResumesService(resumeRepository);
