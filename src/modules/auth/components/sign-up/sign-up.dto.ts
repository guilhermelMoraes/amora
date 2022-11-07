import { date, object, ref, SchemaOf, string } from 'yup';

import User, { FullName } from '../../user';

interface SignUpDto
  extends Omit<User, 'fullName' | 'emailVerified' | 'profilePicture'>,
    FullName {
  password: string;
  confirmation: string;
}

const signUpValidation: SchemaOf<SignUpDto> = object({
  email: string().email('E-mail inválido').required('Campo obrigatório'),
  firstName: string()
    .required('Campo obrigatório')
    .min(2, 'Nome deve conter, no mínimo, dois caracteres')
    .max(60, 'Nome deve conter, no máximo, sessenta caracteres')
    .matches(
      /^[a-zA-Z\s]*$/,
      'Sobrenome deve conter apenas letras e espaços em branco'
    ),
  surname: string()
    .required('Campo obrigatório')
    .min(2, 'Sobrenome deve conter, no mínimo, dois caracteres')
    .max(60, 'Sobrenome deve conter, no máximo, sessenta caracteres')
    .matches(
      /^[a-zA-Z\s]*$/,
      'Sobrenome deve conter apenas letras e espaços em branco'
    ),
  birthday: date()
    .required('Campo obrigatório')
    .typeError('Data em formato inválido'),
  password: string()
    .required('Campo obrigatório')
    .min(8, 'Senha deve conter, no mínimo, oito caracteres')
    .max(80, 'Senha deve conter, no máximo, oitenta caracteres'),
  confirmation: string()
    .required('Campo obrigatório')
    .min(8, 'Senha deve conter, no mínimo, oito caracteres')
    .max(80, 'Senha deve conter, no máximo, oitenta caracteres')
    .oneOf([ref('password')], 'Senha e confirmação diferentes'),
});

export default SignUpDto;
export { signUpValidation };
