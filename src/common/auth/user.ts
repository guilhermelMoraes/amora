type FullName = {
  firstName: string;
  surname: string;
};

interface AuthUser {
  email: string;
  birthday: Date;
  fullName: FullName;
}

export default AuthUser;
export type { FullName };
