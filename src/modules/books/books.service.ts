import { ForbiddenException, Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UsersRepository } from '../users/users.repository';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
    constructor(private readonly booksRepository: BooksRepository, private usersRepository: UsersRepository) { }

    // Получить список всех книг
    async getAllBooks(): Promise<Book[]> {
        return this.booksRepository.findAll();
    }

    // Получить книгу по ID
    async getBookById(id: number, userId: number): Promise<Book> {
        const user = await this.usersRepository.findByIdOrNotFoundFail(userId);
        const book = await this.booksRepository.findOneOrNotFoundFail(id);
        if (user.age < 18 && book.ageRestriction >= 18) {
            throw new ForbiddenException('too young, Bro')
        }
        return this.booksRepository.findOneOrNotFoundFail(id);
    }

    // Создать новую книгу
    async createBook(dto: CreateBookDto, userId: number): Promise<void> {
        const user = await this.usersRepository.findByIdOrNotFoundFail(userId);

        const book = Book.createBook(dto, userId, user.age);

        await this.booksRepository.save(book);
    }

    // Обновить информацию о книге
    async updateBook(id: number, dto: UpdateBookDto, userId: number): Promise<void> {
        const book = await this.booksRepository.findOneOrNotFoundFail(id);

        book.updateBook(dto, userId);

        await this.booksRepository.save(book);
    }

    // Удалить книгу
    async removeBook(id: number, userId: number): Promise<void> {
        const book = await this.booksRepository.findOneOrNotFoundFail(id);
        if (userId !== book.ownerId) {
            throw new ForbiddenException();
        }
        await this.booksRepository.remove(id);
    }
}
