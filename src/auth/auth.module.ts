import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; // Import UserModule
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './role.guard'; // Import the guard

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'sd3#f!f44fs$H4fx!6Vr&31',
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule), // Use forwardRef here too
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,RolesGuard],
  exports: [AuthService, JwtModule,RolesGuard],
})
export class AuthModule {}
