import PostsRepository from "../repositories/posts.repository.js";

class PostsService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  createPost = async (postData) => {
    return await this.#repository.createPost(postData);
  };
}

// 생성 시 PostService가 사용할 Repository(PostsRepository)를 넣어서 생성
// PostsService 인스턴스 생성 후 반환
export default new PostsService(PostsRepository);
