import User from '../../../common/auth/user';

interface LoginDto extends Pick<User, 'email'> {
  password: string;
}

export default LoginDto;
