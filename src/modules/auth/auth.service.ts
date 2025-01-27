import bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersRepository: UsersRepository, private jwtService: JwtService) { }

    async validateUser(email: string, password: string) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }

        return {
            userId: user.id
        }
    }

    login(userId: string) {
        return {
            accessToken: this.jwtService.sign({ userId })
        }
    }
}
