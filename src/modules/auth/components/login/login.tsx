import { yupResolver } from '@hookform/resolvers/yup';
import {
  AuthError,
  AuthErrorCodes,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import commonTextFieldProps from '../../../../common/helpers/common-input-props';
import useNotification from '../../../../common/hooks/use-notification';
import firebaseAuth from '../../infrastructure/firebase/firebase.config';
import LoginDto, { loginValidation } from './login.dto';
import useTitle from '../../../../common/hooks/use-title';
import PasswordInput from '../../../../common/components/password-input/password-input';

type LoginProps = {
  renderResetPassword: Dispatch<SetStateAction<boolean>>;
};

function Login({ renderResetPassword }: LoginProps) {
  useTitle('Entrar');
  const navigate = useNavigate();
  const notify = useNotification();

  const { register, formState, handleSubmit, setError, reset } =
    useForm<LoginDto>({
      defaultValues: {
        email: '',
        password: '',
      },
      mode: 'all',
      resolver: yupResolver(loginValidation),
    });

  const login = async (user: LoginDto): Promise<void> => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, user.email, user.password);
      reset();
      navigate('/');
    } catch (error) {
      const errorCode = (error as AuthError).code;
      switch (errorCode) {
        case AuthErrorCodes.USER_DELETED:
          setError('email', { message: 'Usuário não encontrado' });
          break;
        case AuthErrorCodes.INVALID_PASSWORD:
          setError('password', { message: 'Senha incorreta' });
          break;
        default:
          notify({
            title: 'Erro interno',
            message:
              'No momento, não conseguimos autenticar você. Por favor, tente novamente mais tarde',
            type: 'error',
          });
          break;
      }
    }
  };

  const forgotPassword = (): void => {
    renderResetPassword(true);
  };

  return (
    <div className="p-3">
      <form className="auth__form mb-2" onSubmit={handleSubmit(login)}>
        {formState.isSubmitting && (
          <div className="auth__form--loading">
            <CircularProgress />
          </div>
        )}
        <TextField
          type="email"
          label="E-mail *"
          {...register('email')}
          {...commonTextFieldProps(formState, 'email')}
        />
        <PasswordInput
          label="Senha *"
          formState={formState}
          field="password"
          {...register('password')}
        />
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          disabled={!formState.isValid || formState.isSubmitting}
          type="submit"
          color="success"
        >
          {formState.isSubmitting ? 'Carregando' : 'Entrar'}
        </Button>
      </form>
      <Button type="button" onClick={forgotPassword}>
        Esqueceu sua senha? Clique aqui
      </Button>
    </div>
  );
}

export default Login;
