import { ForbiddenException, Injectable } from '@nestjs/common';
import { EmailService } from '@/common/services/email.service';
import { TokenService } from '@/auth/services/token.service';
import { TokenType } from '@/auth/constants/token-type.constant';
import { UserService } from '@/user/user.service';
import { AccountStatus } from '@/user/constants/accountStatus.constant';
import { customAlphabet } from 'nanoid';

@Injectable()
export class VerifyAccountService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailService: EmailService
  ) {}

  async sendVerificationEmail(userId: string, email: string): Promise<void> {
    const nanoid = customAlphabet('0123456789', 6);
    const code = nanoid();

    await this.tokenService.createToken({
      userId,
      code,
      type: TokenType.EMAIL_VERIFICATION
    });

    await this.mailService.sendEmail({
      to: email,
      subject: 'Account Verification',
      text: `This is your verification code: ${code}`
    });
  }

  async verifyAccount(userId: string, code: string): Promise<void> {
    const token = { userId, code, type: TokenType.EMAIL_VERIFICATION };

    await this.tokenService.findToken(token);

    const user = await this.userService.findOneById(userId);
    if (user.accountStatus === AccountStatus.VERIFIED) {
      throw new ForbiddenException('User account is already verified.');
    }

    await this.tokenService.deleteToken(token);

    await this.userService.update(user._id, {
      accountStatus: AccountStatus.VERIFIED
    });
  }
}
