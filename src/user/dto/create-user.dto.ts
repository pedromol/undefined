import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    description: 'User first name',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Is user active?',
  })
  @IsNotEmpty()
  isActive: boolean;
}
