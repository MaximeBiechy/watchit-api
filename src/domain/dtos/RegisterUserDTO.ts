import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

class RegisterUserDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export default RegisterUserDTO;
