import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactRequestDto } from './dto/contact-request.dto';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post('contact-request')
  submitContactRequest(@Body() payload: ContactRequestDto) {
    return {
      success: true,
      message: 'Cererea ta a fost primita. Te contactam in cel mai scurt timp.',
      data: {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        subject: payload.subject,
      },
    };
  }
}
