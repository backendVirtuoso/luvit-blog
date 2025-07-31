import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { posts as PostEntity, users as UserEntity } from 'generated/prisma';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) { }

  async getPostsWithPagination(page: number): Promise<{
    posts: Array<Omit<PostEntity, 'content' | 'authorId'>>;
    currentPage: number;
    maxPage: number;
  }> {
    const [count, posts] = await Promise.all([
      this.prisma.posts.count(),
      this.prisma.posts.findMany({
        take: 12,
        skip: 12 * (page - 1),
        select: {
          id: true,
          title: true,
          subTitle: true,
          thumbnail: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    return {
      posts,
      currentPage: page,
      maxPage: Math.ceil(count / 12)
    };
  }

  async getPostWithPostId(
    postId: string,
  ): Promise<PostEntity & { author: Omit<UserEntity, 'password'> }> {
    const post = await this.prisma.posts.findUnique({
      where: {
        id: postId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return post;
  }

  async savePost(
    payload: Omit<PostEntity, 'id' | 'createdAt'>
  ): Promise<PostEntity> {
    const newPost = await this.prisma.posts.create({
      data: {
        title: payload.title,
        subTitle: payload.subTitle,
        thumbnail: payload.thumbnail,
        content: payload.content,
        authorId: payload.authorId,
      },
    });

    return newPost;
  }

  async login(payload: Omit<UserEntity, 'id'>): Promise<{
    id: string;
    name: string;
    loginAt: Date;
  }> {
    const user: UserEntity = await this.prisma.users.findUnique({
      where: {
        name: payload.name
      }
    });

    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    if (user.password != payload.password)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);

    return {
      id: user.id,
      name: user.name,
      loginAt: new Date(),
    };
  }
}
