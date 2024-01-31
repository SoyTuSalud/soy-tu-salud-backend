import { ForbiddenException, Injectable } from '@nestjs/common';
import { MailService } from '@/common/services/mail.service';
import { TokenService } from '@/token/token.service';
import { TokenType } from '@/token/constants/token-type.constant';
import { UserService } from '@/user/user.service';
import { AccountStatus } from '@/user/constants/accountStatus.constant';

@Injectable()
export class VerifyAccountService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService
  ) {}

  async sendVerificationEmail(email: string) {
    const { customAlphabet } = await import('nanoid');
    const nanoid = customAlphabet('0123456789', 6);
    const token = nanoid();

    await this.tokenService.createToken({
      email,
      token,
      type: TokenType.EMAIL_VERIFICATION
    });

    this.mailService.createLocalConnection();
    return await this.mailService.sendEmail({
      to: email,
      text: `http://localhost:8000/auth/verify-email?token=${token}`
    });
  }

  async verifyEmail(email: string, token: string) {
    //verify that the token corresponds with an actual user | invalid token.
    await this.tokenService.validateToken({
      email,
      token,
      type: TokenType.EMAIL_VERIFICATION
    });
    //check if the user is already verified
    const user = await this.userService.findOneByEmail(email);
    if (user.accountStatus === AccountStatus.VERIFIED) {
      throw new ForbiddenException('User account is already verified.');
    }
    //check if the current token has expired or not | Token has expired. Please try again.
    //change verifications status to verified
  }
}
