// prisma client 인스턴스 가져옴
import prisma from "../prisma/prisma.js";

class PostsRepository {
  // orm는 오직 PostsService만 접근하도록 private(#) 설정
  #orm;

  // PostsRepository가 생성될 때 사용할 Orm을 받게 함.
  constructor(orm) {
    this.#orm = orm;
  }

  // 게시글 생성
  createPost = async ({ title, content, password }) => {
    // 생성될 때 받은 orm을 이용하여 db 접근
    return await this.#orm.posts.create({
      data: { title, content, password },
    });
  };
}

export default new PostsRepository(prisma);
