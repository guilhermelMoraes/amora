/* eslint-disable react/jsx-props-no-spreading */
import TextField, { BaseTextFieldProps } from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { SchemaOf, object, string, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FieldErrorsImpl } from 'react-hook-form';
import { useState } from 'react';

type SignUpFormFields = {
  email: string;
  password: string;
  confirmation: string;
};

type FormErrors = Partial<FieldErrorsImpl<SignUpFormFields>>;

const commonTextFieldProps = (
  errors: FormErrors,
  field: keyof SignUpFormFields
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

  const localSignUpValidationSchema: SchemaOf<SignUpFormFields> = object({
    email: string().email('E-mail inválido').required('Campo obrigatório'),
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

  const {
    register,
    formState: { errors, isValid },
  } = useForm<SignUpFormFields>({
    defaultValues: {
      email: '',
      password: '',
      confirmation: '',
    },
    mode: 'all',
    resolver: yupResolver(localSignUpValidationSchema),
  });

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
            InputLabelProps={{}}
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
