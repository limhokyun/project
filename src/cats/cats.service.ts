import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    //이메일이 존재하는지 확인해주는 함수
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다');
    }

    //패스워드 암호화 == 개발자, 디비에 접근할 수 있는 사용자가 비밀번호를 보게되면 개인정보 위험이 있다.
    const hashedPassword = await bcrypt.hash(password, 10);

    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
