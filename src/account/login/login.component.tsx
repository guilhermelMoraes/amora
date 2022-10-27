import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, SchemaOf, string } from 'yup';

import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import commonTextFieldProps from '../../common/helpers/common-input-props';
import LoginDto from './login.dto';

function LoginComponent() {
  const REQUIRED_FIELD_MESSAGE = 'Campo obrigatório';
  const loginValidation: SchemaOf<LoginDto> = object({
    email: string().required(REQUIRED_FIELD_MESSAGE).email('E-mail inválido'),
    password: string()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(8, 'Senha deve conter, no mínimo, oito caracteres')
      .max(80, 'Senha deve conter, no máximo, oitenta caracteres'),
  });

  const { register, formState } = useForm<LoginDto>({
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

  return (
    <form className="p-3">
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
      >
        {formState.isSubmitting ? 'Carregando' : 'Entrar'}
      </Button>
    </form>
  );
}

export default LoginComponent;
