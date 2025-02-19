import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @ApiProperty({ example: 123 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ nullable: true, default: null })
  updatedAt: Date;
}
