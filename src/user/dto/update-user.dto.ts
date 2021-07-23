import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({
    description: 'User first name',
  })
  @IsOptional()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
  })
  @IsOptional()
  lastName: string;

  @ApiProperty({
    description: 'Is user active?',
  })
  @IsOptional()
  isActive: boolean;
}
