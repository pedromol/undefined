import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({
    description: 'User first name',
  })
  @ValidateIf((self) => !Object.keys(self).length)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
  })
  @ValidateIf((self) => !Object.keys(self).length)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Is user active?',
  })
  @ValidateIf((self) => !Object.keys(self).length)
  @IsNotEmpty()
  isActive: boolean;
}
