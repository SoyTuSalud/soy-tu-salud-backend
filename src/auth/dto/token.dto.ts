import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TokenType } from '../constants/token-type.constant';

export class TokenDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsEnum(TokenType)
  @IsNotEmpty()
  readonly type: TokenType;
}
