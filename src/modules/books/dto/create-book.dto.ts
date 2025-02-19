import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateBookDto {
    @ApiProperty({ example: 'Sherlock Holmes', description: 'A book\'s title', minLength: 2 })
    @IsString()
    @MinLength(2)
    title: string;

    @ApiProperty({ example: 18, description: 'Age restriction for a book', minimum: 0, maximum: 120 })
    @IsInt()
    @Min(0)
    @Max(120)
    @Type(() => Number)
    ageRestriction: number;

    @ApiProperty({ example: 'Artur Conan Doyle', description: 'A book\'s author' })
    @IsString()
    author: string;

    @ApiPropertyOptional({ example: 'https://some-website.net/book-cover', description: 'A URL for a book cover picture' })
    @IsOptional()
    @IsString()
    image?: string;
}
