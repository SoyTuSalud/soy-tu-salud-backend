import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST'),
      port: this.configService.get('EMAIL_PORT'),
      secure: this.configService.get<boolean>('EMAIL_TLS'),
      auth: {
        user: this.configService.get('EMAIL_USERNAME'),
        pass: this.configService.get('EMAIL_PASSWORD')
      }
    });
  }

  async sendEmail(options: nodemailer.SendMailOptions) {
    const fromName = this.configService.get('EMAIL_FROM_NAME');
    const fromEmail = this.configService.get('EMAIL_FROM_EMAIL');
    return await this.transporter
      .sendMail({
        ...options,
        from: options.from ?? `"${fromName}" <${fromEmail}>`
      })
      .then(console.log)
      .catch(e => {
        console.log('Error sending email: ' + e);
        throw new InternalServerErrorException('Failed to send email.');
      });
  }

  async verifyConnection() {
    return this.transporter.verify();
  }
}
