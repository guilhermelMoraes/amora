type FullName = {
  firstName: string;
  surname: string;
};

interface User {
  email: string;
  emailVerified: boolean;
  birthday: Date;
  fullName: FullName;
  profilePicture: string | null;
}

export default User;
export type { FullName };
