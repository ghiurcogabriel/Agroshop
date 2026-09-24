import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization as string | undefined;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token lipsa sau invalid.');
    }

    const token = authHeader.slice('Bearer '.length).trim();

    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        role: string;
      }>(token, {
        secret: this.configService.get<string>('JWT_SECRET') ?? 'crm-secret',
      });

      if (payload.role !== 'admin') {
        throw new UnauthorizedException('Acces permis doar adminului.');
      }

      request.admin = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Token expirat sau invalid.');
    }
  }
}
