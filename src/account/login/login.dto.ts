import AuthUser from '../../common/auth/user';

interface LoginDto extends Pick<AuthUser, 'email'> {
  password: string;
}

export default LoginDto;
