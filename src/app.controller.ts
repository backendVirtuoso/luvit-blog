import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { posts as PostEntity, users as UserEntity } from 'generated/prisma';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/post')
  getPostsWithPagination(@Query('page') page: string) {
    return this.appService.getPostsWithPagination(+page);
  }

  @Get('/post/:postId')
  getPostWithPostId(@Param('postId') postId: string) {
    return this.appService.getPostWithPostId(postId);
  }

  @Post('/post')
  savePost(@Body() payload: Omit<PostEntity, 'id' | 'createdAt'>) {
    return this.appService.savePost(payload);
  }

  @Post('/image')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './images', filename(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`);
      },
    }),
    fileFilter(req, file, callback) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('This is not a image!'), false);
      }
      callback(null, true);
    },
  }))
  uploadImage(@UploadedFile() file: Express.Multer.File): string {
    return file.filename;
  }

  @Post('/login')
  async login(
    @Body() payload: Omit<UserEntity, 'id'>,
    @Req()
    req: Request & {
      session: Record<'user', {
        id: string;
        name: string;
        loginAt: Date;
      }>;
    }
  ) {
    const user = await this.appService.login(payload);
    req.session.user = user;
    return user;
  }

  @Get('/login')
  async sessionLogin(
    @Req()
    req: Request & {
      session: Record<'user', {
        id: string;
        name: string;
        loginAt: Date;
      }>;
    },
  ) {
    if (!req?.session?.user) {
      throw new HttpException('login please', HttpStatus.UNAUTHORIZED);
    }

    return req?.session?.user;
  }

  @Delete('/login')
  deleteSession(
    @Req()
    req: Request & {
      session: Record<'user', {
        id: string;
        name: string;
        loginAt: Date;
      }>;
    }
  ) {
    req.session.destroy(function () { });
  }
}
