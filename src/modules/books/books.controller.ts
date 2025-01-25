import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    // Получить список всех книг
    @Get()
    async getAllBooks() {
        return this.booksService.getAllBooks();
    }

    // Получить книгу по ID
    @Get(':id')
    async getBookById(@Param('id') id: number) {
        return this.booksService.getBookById(id);
    }

    // Создать новую книгу
    @Post()
    async createBook(@Body() bookDto: CreateBookDto) {
        return this.booksService.createBook(bookDto);
    }

    // Обновить информацию о книге
    @Put(':id')
    async updateBook(@Param('id') id: number, @Body() bookDto: UpdateBookDto) {
        // необходимо вызвать соответствующий метод сервиса и вернуть результат
        //const result = await this.booksService.someMethod();
    }

    // Удалить книгу
    @Delete(':id')
    async deleteBook(@Param('id') id: number) {
        return this.booksService.removeBook(id);
    }
}