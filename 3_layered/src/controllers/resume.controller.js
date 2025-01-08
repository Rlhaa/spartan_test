// resume.controller.js
import resumeService from "../services/resumes.service.js";

class ResumeController {
  #service;
  constructor(service) {
    this.#service = service;
  }

  createResume = async (req, res) => {
    try {
      const userId = req.user;
      const { title, content } = req.body;

      const data = await this.#service.createResume({ userId, title, content });

      return res.status(200).json({
        message: "이력서가 생성되었습니다.",
        data,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  getResumesById = async (req, res) => {
    try {
      const userId = req.user;
      const data = await this.#service.getResumesById({ userId });

      return res.status(200).json({
        message: "`${user.name}`님의 이력서리스트를 조회하였습니다.",
        data,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  getResume = async (req, res) => {
    try {
      const userId = req.user;
      const { resumeId } = req.params;
      const data = await this.#service.getResume({
        userId,
        resumeId: +resumeId,
      });

      return res.status(200).json({
        message: "이력서를 조회하였습니다.",
        data,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  updateResume = async (req, res) => {
    try {
      const userId = req.user;
      const { title, content } = req.body;
      const { resumeId } = req.params;

      const data = await this.#service.updateResume({
        userId,
        resumeId: +resumeId,
        title,
        content,
      });

      return res.status(200).json({
        message: "이력서가 수정되었습니다.",
        data,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  deleteResume = async (req, res) => {
    try {
      const userId = req.user;
      const { resumeId } = req.params;
      const data = await this.#service.deleteResume({
        userId,
        resumeId: +resumeId,
      });

      return res.status(200).json({
        message: "이력서가 삭제되었습니다.",
        data,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default new ResumeController(resumeService);
