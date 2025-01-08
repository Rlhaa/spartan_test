import PostsService from "../services/posts.service.js";

class PostsController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  // 게시글 생성
  createPost = async (req, res) => {
    const { title, content, password } = req.body;
    const post = await this.#service.createPost({ title, content, password });
    return res.status(201).json({ data: post });
  };


}

// 생성 시 PostsController가 사용할 Service(PostsService)를 넣어서 생성
// PostsController 인스턴스 생성 후 반환
export default new PostsController(PostsService);
