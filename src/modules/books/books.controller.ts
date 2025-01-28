import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth-guard';

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
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async createBook(@Body() bookDto: CreateBookDto, @Request() req: any) {
        return this.booksService.createBook(bookDto, req.user.userId);
    }

    // Обновить информацию о книге
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateBook(@Param('id') id: number, @Body() bookDto: UpdateBookDto, @Request() req: any) {
        return this.booksService.updateBook(id, bookDto, req.user.userId);
    }

    // Удалить книгу
    @Delete(':id')
    async deleteBook(@Param('id') id: number) {
        return this.booksService.removeBook(id);
    }
}