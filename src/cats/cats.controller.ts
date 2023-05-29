import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return this.catsService.signUp(body);
  }

  @Post('login')
  login() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logOut';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
