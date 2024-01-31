import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  private transporter: nodemailer.Transporter;

  async createLocalConnection() {
    let account = await nodemailer.createTestAccount();
    this.transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });
  }

  async createConnection() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      //host: this.configService.get('MAIL_HOST'),
      //port: this.configService.get('MAIL_PORT'),
      //secure: this.configService.get('MAIL_TLS') === 'TRUE' ? true : false,
      auth: {
        user: this.configService.get('MAIL_USERNAME'),
        pass: this.configService.get('MAIL_PASSWORD')
      }
    });
  }

  async sendEmail(options: nodemailer.SendMailOptions) {
    const nick = this.configService.get('MAIL_FROM');
    const sender = this.configService.get('MAIL_SENDER');
    return await this.transporter
      .sendMail({
        ...options,
        from: options.from ?? `"${nick}" <${sender}>`
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
