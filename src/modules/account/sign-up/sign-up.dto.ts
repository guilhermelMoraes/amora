import User, { FullName } from '../../../common/auth/user';

interface SignUpDto
  extends Omit<User, 'fullName' | 'emailVerified' | 'profilePicture'>,
    FullName {
  password: string;
  confirmation: string;
}

export default SignUpDto;
