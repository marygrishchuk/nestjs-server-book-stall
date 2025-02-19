import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../core/entity/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ example: 'Bob', minLength: 1 })
  @Column()
  name: string;

  @ApiProperty({ example: 'user-email@books.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 25, minimum: 1, maximum: 120 })
  @Column()
  age: number;

  @ApiProperty({ example: 'user-password', minLength: 8 })
  @Column()
  passwordHash: string;
}
