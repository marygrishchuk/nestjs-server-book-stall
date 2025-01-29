
import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtGuard extends AuthGuard('jwt') {
    handleRequest(err, user) {
        // Letting unauthorized user through by removing "|| !user" from the original condition:
        if (err) {
            throw err;
        }
        return user;
    }
}
