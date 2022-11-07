import { object, SchemaOf, string } from 'yup';

import User from '../../user';

interface LoginDto extends Pick<User, 'email'> {
  password: string;
}

const loginValidation: SchemaOf<LoginDto> = object({
  email: string().required('Campo obrigatório').email('E-mail inválido'),
  password: string()
    .required('Campo obrigatório')
    .min(8, 'Senha deve conter, no mínimo, oito caracteres')
    .max(80, 'Senha deve conter, no máximo, oitenta caracteres'),
});

export default LoginDto;
export { loginValidation };
