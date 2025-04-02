import { IsString } from 'class-validator';

export class CreateUserDto {
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//   @IsString()
//   readonly name: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  readonly email: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  readonly password: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  readonly role: string;
}
