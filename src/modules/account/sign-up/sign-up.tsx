import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { date, object, ref, SchemaOf, string } from 'yup';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { useNavigate } from 'react-router-dom';
import commonTextFieldProps from '../../../common/helpers/common-input-props';
import useHttp, { isHttpErrorResponse } from '../../../common/hooks/use-http';
import useNotification from '../../../common/hooks/use-notification';
import SignUpDto from './sign-up.dto';

type SignUpProps = {
  setTabIndex: Dispatch<SetStateAction<number>>;
};

function SignUp({ setTabIndex }: SignUpProps) {
  const { post } = useHttp();
  const navigate = useNavigate();
  const notify = useNotification();

  const REQUIRED_FIELD_MESSAGE = 'Campo obrigatório';
  const signUpValidation: SchemaOf<SignUpDto> = object({
    email: string().email('E-mail inválido').required('Campo obrigatório'),
    firstName: string()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(2, 'Nome deve conter, no mínimo, dois caracteres')
      .max(60, 'Nome deve conter, no máximo, sessenta caracteres')
      .matches(
        /^[a-zA-Z\s]*$/,
        'Sobrenome deve conter apenas letras e espaços em branco'
      ),
    surname: string()
      .required(REQUIRED_FIELD_MESSAGE)
      .min(2, 'Sobrenome deve conter, no mínimo, dois caracteres')
      .max(60, 'Sobrenome deve conter, no máximo, sessenta caracteres')
      .matches(
        /^[a-zA-Z\s]*$/,
        'Sobrenome deve conter apenas letras e espaços em branco'
      ),
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

  const { setError, reset, register, formState, handleSubmit } =
    useForm<SignUpDto>({
      defaultValues: {
        email: '',
        firstName: '',
        surname: '',
        birthday: new Date(),
        password: '',
        confirmation: '',
      },
      mode: 'all',
      resolver: yupResolver(signUpValidation),
    });

  const signUp = async (user: SignUpDto) => {
    const response = await post<void>('auth/sign-up', user);
    if (isHttpErrorResponse(response)) {
      setError(response.failedProperty as keyof SignUpDto, {
        message: response.message,
      });

      return;
    }

    reset();

    notify(
      {
        type: 'success',
        title: 'Bem-vindo',
        message:
          'Sua conta foi criada com sucesso. Você será redirecionado para a aba de login',
      },
      {
        position: 'bottom-center',
        onClose: () => setTabIndex(0),
      }
    );

    navigate('/');
  };

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
    <form className="account__form p-3" onSubmit={handleSubmit(signUp)}>
      {formState.isSubmitting && (
        <div className="account__form--loading">
          <CircularProgress />
        </div>
      )}
      <TextField
        label="E-mail *"
        type="email"
        fullWidth
        {...commonTextFieldProps(formState, 'email')}
        {...register('email')}
      />
      <Grid container spacing={{ sm: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nome *"
            type="text"
            fullWidth
            {...commonTextFieldProps(formState, 'firstName')}
            {...register('firstName')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Sobrenome *"
            type="text"
            fullWidth
            {...commonTextFieldProps(formState, 'surname')}
            {...register('surname')}
          />
        </Grid>
      </Grid>
      <TextField
        label="Data de nascimento *"
        type="date"
        fullWidth
        {...commonTextFieldProps(formState, 'birthday')}
        {...register('birthday')}
        InputLabelProps={{ shrink: true }}
      />
      <Grid container spacing={{ sm: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Senha *"
            type={passwordType}
            fullWidth
            {...commonTextFieldProps(formState, 'password')}
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
            {...commonTextFieldProps(formState, 'confirmation')}
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
        color="success"
        startIcon={<PersonAddIcon />}
        disabled={!formState.isValid || formState.isSubmitting}
        type="submit"
      >
        {formState.isSubmitting ? 'Carregando' : 'Criar conta'}
      </Button>
    </form>
  );
}

export default SignUp;
