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
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth-guard';
import { OptionalJwtGuard } from 'src/core/guards/optional-jwt-guard';
import { badCreateBookRequestResponseExample } from 'src/core/types/swagger-types';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    // Get the list of all books
    @Get()
    @ApiOkResponse({ type: [Book] })
    async getAllBooks() {
        return this.booksService.getAllBooks();
    }

    // Get a specific book by its ID
    @Get(':id')
    @ApiUnauthorizedResponse({ description: 'Unauthorized.', example: { message: "Unauthorized", statusCode: 401 } })
    @ApiNotFoundResponse({ description: 'The book is not found.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @UseGuards(OptionalJwtGuard)
    async getBookById(@Param('id') id: number, @Request() req: any) {
        return this.booksService.getBookById(id, req.user?.userId);
    }

    // Create (add) a new book
    @Post()
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'A book has been successfully added.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.', example: { message: "Unauthorized", statusCode: 401 } })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBadRequestResponse({ description: 'Bad Request', example: badCreateBookRequestResponseExample })
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async createBook(@Body() bookDto: CreateBookDto, @Request() req: any) {
        return this.booksService.createBook(bookDto, req.user.userId);
    }

    // Update a book info
    @Put(':id')
    @ApiBearerAuth()
    @ApiNotFoundResponse({ description: 'The book is not found.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.', example: { message: "Unauthorized", statusCode: 401 } })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @UseGuards(JwtAuthGuard)
    async updateBook(@Param('id') id: number, @Body() bookDto: UpdateBookDto, @Request() req: any) {
        return this.booksService.updateBook(id, bookDto, req.user.userId);
    }

    // Delete a book
    @Delete(':id')
    @ApiBearerAuth()
    @ApiNotFoundResponse({ description: 'The book is not found.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.', example: { message: "Unauthorized", statusCode: 401 } })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @UseGuards(JwtAuthGuard)
    async deleteBook(@Param('id') id: number, @Request() req: any) {
        return this.booksService.removeBook(id, req.user.userId);
    }
}