import { IsEmail, IsString } from 'class-validator';

class SigninUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export default SigninUserDTO;
