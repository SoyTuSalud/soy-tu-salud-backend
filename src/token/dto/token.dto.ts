import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TokenType } from '../constants/token-type.constant';

export class TokenDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly token: string;

  @IsEnum(TokenType)
  @IsNotEmpty()
  readonly type: TokenType;
}
