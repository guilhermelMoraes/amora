import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import PasswordInput from '../../../../common/components/password-input/password-input';
import commonTextFieldProps from '../../../../common/helpers/common-input-props';
import useHttp, {
  isHttpErrorResponse,
} from '../../../../common/hooks/use-http';
import useNotification from '../../../../common/hooks/use-notification';
import useTitle from '../../../../common/hooks/use-title';
import SignUpDto, { signUpValidation } from './sign-up.dto';

type SignUpProps = {
  setTabIndex: Dispatch<SetStateAction<number>>;
};

function SignUp({ setTabIndex }: SignUpProps) {
  useTitle('Criar conta');
  const { post } = useHttp();
  const navigate = useNavigate();
  const notify = useNotification();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    setError,
    reset: resetForm,
    register,
    formState,
    handleSubmit,
  } = useForm<SignUpDto>({
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
    const response = await post('auth/sign-up', user);
    if (isHttpErrorResponse(response)) {
      setError(response.failedProperty as keyof SignUpDto, {
        message: response.message,
      });

      return;
    }

    resetForm();

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

  return (
    <form className="auth__form p-3" onSubmit={handleSubmit(signUp)}>
      {formState.isSubmitting && (
        <div className="auth__form--loading">
          <CircularProgress />
        </div>
      )}
      <TextField
        label="E-mail *"
        type="email"
        {...commonTextFieldProps(formState, 'email')}
        {...register('email')}
      />
      <Grid container spacing={{ sm: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nome *"
            type="text"
            {...commonTextFieldProps(formState, 'firstName')}
            {...register('firstName')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Sobrenome *"
            type="text"
            {...commonTextFieldProps(formState, 'surname')}
            {...register('surname')}
          />
        </Grid>
      </Grid>
      <TextField
        label="Data de nascimento *"
        type="date"
        {...commonTextFieldProps(formState, 'birthday')}
        {...register('birthday')}
        InputLabelProps={{ shrink: true }}
      />
      <Grid container spacing={{ sm: 2 }}>
        <Grid item xs={12} sm={6}>
          <PasswordInput
            label="Senha *"
            formState={formState}
            field="password"
            visible={passwordVisible}
            setVisible={setPasswordVisible}
            {...register('password')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PasswordInput
            label="Senha *"
            formState={formState}
            field="confirmation"
            visible={passwordVisible}
            setVisible={setPasswordVisible}
            {...register('confirmation')}
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
