import { yupResolver } from '@hookform/resolvers/yup';
import { AuthError, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import commonTextFieldProps from '../../../../common/helpers/common-input-props';
import useNotification from '../../../../common/hooks/use-notification';
import firebaseAuth from '../../firebase/firebase.config';
import LoginDto, { loginValidation } from './login.dto';

function Login() {
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

  const [passwordVisible, setPasswordVisible] = useState(false);
  const passwordType = passwordVisible ? 'text' : 'password';
  const passwordInputIcon = passwordVisible ? (
    <VisibilityIcon />
  ) : (
    <VisibilityOffIcon />
  );
  const passwordInputText = passwordVisible ? 'Esconder senha' : 'Exibir senha';
  const passwordAdornment = () => (
    <InputAdornment position="end">
      <IconButton
        aria-label={passwordInputText}
        onClick={() => setPasswordVisible(!passwordVisible)}
      >
        {passwordInputIcon}
      </IconButton>
    </InputAdornment>
  );

  const login = async (user: LoginDto): Promise<void> => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, user.email, user.password);
      reset();
      navigate('/');
    } catch (error) {
      const errorCode = (error as AuthError).code;
      switch (errorCode) {
        case 'auth/user-not-found':
          setError('email', { message: 'Usuário não encontrado' });
          break;
        case 'auth/wrong-password':
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

  return (
    <form className="account__form p-3" onSubmit={handleSubmit(login)}>
      {formState.isSubmitting && (
        <div className="account__form--loading">
          <CircularProgress />
        </div>
      )}
      <TextField
        type="email"
        fullWidth
        label="E-mail *"
        {...register('email')}
        {...commonTextFieldProps(formState, 'email')}
      />
      <TextField
        label="Senha *"
        variant="outlined"
        type={passwordType}
        fullWidth
        InputProps={{
          endAdornment: passwordAdornment(),
        }}
        {...register('password')}
        {...commonTextFieldProps(formState, 'password')}
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
  );
}

export default Login;
