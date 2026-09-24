import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto } from './dto/admin-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async adminLogin(dto: AdminLoginDto) {
    const username =
      this.configService.get<string>('ADMIN_USERNAME') ?? 'admin';
    const password =
      this.configService.get<string>('ADMIN_PASSWORD') ?? 'admin123!';

    if (dto.username !== username || dto.password !== password) {
      throw new UnauthorizedException('Credentiale admin invalide.');
    }

    const payload = {
      sub: username,
      role: 'admin',
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      role: 'admin',
      username,
    };
  }
}
