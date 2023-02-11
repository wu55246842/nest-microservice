import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class LoginUser {
  @ApiProperty({ description: 'account' })
  @IsString({ message: 'account type error' })
  @IsNotEmpty({ message: 'account cannot be empty' })
  readonly account: string

  @ApiProperty({ description: 'password' })
  @IsString({ message: 'password type error' })
  @IsNotEmpty({ message: 'password cannot be empty' })
  readonly password: string
}
