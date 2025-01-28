import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('Book', () => {
    const majorDto: CreateBookDto = {
        author: 'author A',
        title: 'title A',
        ageRestriction: 18,
    }
    const minorDto: CreateBookDto = {
        author: 'author B',
        title: 'title B',
        ageRestriction: 5,
    }
    const updateDto: UpdateBookDto = {
        author: 'author C',
    }
    const userId = 7589;

    describe('createBook', () => {
        it('should throw an error if user is minor & book has age restriction of 18+', () => {
            expect(() => Book.createBook(majorDto, userId, 15)).toThrow();
        });
        it('should create a book if user is 15 & book has age restriction of 5+', () => {
            expect(Book.createBook(minorDto, userId, 15)).toMatchObject({
                ...minorDto,
                ownerId: userId
            });
        });
        it('should create a book if user is major & book has age restriction of 18+', () => {
            expect(Book.createBook(majorDto, userId, 18)).toMatchObject({
                ...majorDto,
                ownerId: userId
            });
        });
    });

    describe('updateBook', () => {
        it('should throw an error if user is not the book owner', () => {
            const book = Book.createBook(majorDto, userId, 18);
            expect(() => book.updateBook(updateDto, 6548)).toThrow();
        });
        it('should update the book author only if user is the book owner', () => {
            const book = Book.createBook(majorDto, userId, 18);
            book.updateBook(updateDto, userId);
            expect(book.author).toBe(updateDto.author);
            expect(book.title).toBe(book.title);
        });
    });
});
