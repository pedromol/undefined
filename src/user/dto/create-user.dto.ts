import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User first name',
  })
  firstName: string;

  @ApiProperty({
    description: 'User last name',
  })
  lastName: string;

  @ApiProperty({
    description: 'Is user active?',
  })
  isActive: boolean;
}
