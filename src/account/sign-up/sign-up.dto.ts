import AuthUser, { FullName } from '../../common/auth/user';

interface SignUpDto extends Omit<AuthUser, 'fullName'>, FullName {
  password: string;
  confirmation: string;
}

export default SignUpDto;
