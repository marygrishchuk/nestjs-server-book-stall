import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, Max, Min, MinLength } from "class-validator";

export class RegisterUserDto {
  @ApiProperty({ example: 'Bob', minLength: 1 })
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 'user-email@books.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 25, minimum: 1, maximum: 120 })
  @Min(1)
  @Max(120)
  @Type(() => Number)
  age: number;

  @ApiProperty({ example: 'user-password', minLength: 8 })
  @MinLength(8)
  password: string;
};
