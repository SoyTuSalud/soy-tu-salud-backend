import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString
} from 'class-validator';

export class TokenBlacklistDto {
  @IsString()
  @IsNotEmpty()
  readonly jti: string;

  @IsNumber()
  @IsPositive()
  readonly exp: number;
}
