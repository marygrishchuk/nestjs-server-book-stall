import { ForbiddenException } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../core/entity/base.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Entity('books')
export class Book extends BaseEntity {
    @ApiProperty({ example: 'Sherlock Holmes', description: 'A book\'s title', minLength: 2 })
    @Column()
    title: string;

    @ApiProperty({ example: 'Artur Conan Doyle', description: 'A book\'s author' })
    @Column()
    author: string;

    @ApiProperty({ example: 18, description: 'Age restriction for a book', minimum: 0, maximum: 120 })
    @Column()
    ageRestriction: number;

    @ApiProperty({ example: 1822, description: 'An id of a user who added the book' })
    @Column()
    ownerId: number; // an id of a user who added the book

    @ApiPropertyOptional({ example: 'https://some-website.net/book-cover', description: 'A URL for a book cover picture' })
    @Column({ nullable: true })
    image?: string;

    static createBook(dto: CreateBookDto, userId: number, userAge: number) {
        if (userAge < 18 && dto.ageRestriction >= 18) {
            throw new ForbiddenException('too young, Bro')
        }

        const book = new Book();
        book.title = dto.title;
        book.ageRestriction = dto.ageRestriction;
        book.author = dto.author;
        book.image = dto.image;
        book.ownerId = userId;

        return book;
    }

    updateBook(dto: UpdateBookDto, userId: number) {
        if (userId !== this.ownerId) {
            throw new ForbiddenException();
        }

        this.title = dto.title ?? this.title;
        this.ageRestriction = dto.ageRestriction ?? this.ageRestriction;
        this.author = dto.author ?? this.author;
        this.image = dto.image ?? this.image;
    }
}
