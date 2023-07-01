import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  private readonly user = { id: 1, username: 'user 1', password: '123' }

  async signIn(pass: string) {
    if (this.user.password !== pass) {
      throw new UnauthorizedException()
    }
    const payload = { sub: this.user.id, username: this.user.username }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
