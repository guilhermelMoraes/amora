import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { BaseTextFieldProps } from '@mui/material/TextField';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FieldErrorsImpl, useForm } from 'react-hook-form';
import { date, object, ref, SchemaOf, string } from 'yup';
import SignUpDto from './sign-up.dto';

const commonTextFieldProps = (
  errors: Partial<FieldErrorsImpl<SignUpDto>>,
  field: keyof SignUpDto
): BaseTextFieldProps => ({
  variant: 'outlined',
  size: 'small',
  autoComplete: 'off',
  helperText: errors[field] ? errors[field]?.message : ' ',
  FormHelperTextProps: {
    classes: { root: 'text-truncate' },
    title: errors[field] ? errors[field]?.message : ' ',
  },
  error: Boolean(errors[field]),
  classes: { root: 'mb-3' },
});

function SignUpComponent() {
  const REQUIRED_FIELD_MESSAGE = 'Campo obrigatório';

  const signUpValidation: SchemaOf<SignUpDto> = object({
    email: string().email('E-mail inválido').required('Campo obrigatório'),
    firstName: string()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(2, 'Nome deve conter, no mínimo, dois caracteres')
      .max(60, 'Nome deve conter, no máximo, sessenta caracteres'),
    surname: string()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(2, 'Sobrenome deve conter, no mínimo, dois caracteres')
      .max(60, 'Sobrenome deve conter, no máximo, sessenta caracteres'),
    birthday: date()
      .required(REQUIRED_FIELD_MESSAGE)
      .typeError('Data em formato inválido'),
    password: string()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(8, 'Senha deve conter, no mínimo, oito caracteres')
      .max(80, 'Senha deve conter, no máximo, oitenta caracteres'),
    confirmation: string()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(8, 'Senha deve conter, no mínimo, oito caracteres')
      .max(80, 'Senha deve conter, no máximo, oitenta caracteres')
      .oneOf([ref('password')], 'Senha e confirmação diferentes'),
  });

  const {
    register,
    formState: { errors, isValid },
  } = useForm<SignUpDto>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      surname: '',
      birthday: new Date(),
      confirmation: '',
    },
    mode: 'all',
    resolver: yupResolver(signUpValidation),
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
        label="E-mail *"
        type="email"
        fullWidth
        {...commonTextFieldProps(errors, 'email')}
        {...register('email')}
      />
      <Grid container spacing={{ sm: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nome *"
            type="text"
            fullWidth
            {...commonTextFieldProps(errors, 'firstName')}
            {...register('firstName')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Sobrenome *"
            type="text"
            fullWidth
            {...commonTextFieldProps(errors, 'surname')}
            {...register('surname')}
          />
        </Grid>
      </Grid>
      <TextField
        label="Data de nascimento *"
        type="date"
        fullWidth
        {...commonTextFieldProps(errors, 'birthday')}
        {...register('birthday')}
        InputLabelProps={{ shrink: true }}
      />
      <Grid container spacing={{ sm: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Senha *"
            type={passwordType}
            fullWidth
            {...commonTextFieldProps(errors, 'password')}
            {...register('password')}
            InputProps={{
              endAdornment: passwordAdornment(),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Senha *"
            type={passwordType}
            fullWidth
            {...commonTextFieldProps(errors, 'confirmation')}
            {...register('confirmation')}
            InputProps={{
              endAdornment: passwordAdornment(),
            }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        fullWidth
        endIcon={<PersonAddIcon />}
        disabled={!isValid}
      >
        Criar conta
      </Button>
    </form>
  );
}

export default SignUpComponent;
