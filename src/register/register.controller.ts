import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisDto } from './dto/register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) { }

  @Post()
  register(@Body() dto: RegisDto) {
    return this.registerService.createRegister(dto);
  }
}
