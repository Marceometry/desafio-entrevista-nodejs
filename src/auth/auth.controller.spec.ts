import { Test, TestingModule } from '@nestjs/testing'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UnauthorizedException } from '@nestjs/common'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test',
          signOptions: { expiresIn: '3600s' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should login successfully', async () => {
    const { access_token } = await controller.signIn({ password: '123' })
    expect(access_token).toBeDefined()
  })

  it('should fail login', async () => {
    await expect(
      async () => await controller.signIn({ password: '1234' }),
    ).rejects.toThrowError(UnauthorizedException)
  })
})
