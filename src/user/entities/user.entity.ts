import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    description: 'User identification',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'User first name',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    description: 'Is user active?',
  })
  @Column({ default: true })
  isActive: boolean;
}
