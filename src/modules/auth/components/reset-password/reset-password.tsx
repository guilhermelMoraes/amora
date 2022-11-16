import { yupResolver } from '@hookform/resolvers/yup';
import {
  AuthError,
  AuthErrorCodes,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  Dispatch,
  ForwardedRef,
  forwardRef,
  SetStateAction,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { object, ref as YupRef, string } from 'yup';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import commonTextFieldProps from '../../../../common/helpers/common-input-props';
import useNotification from '../../../../common/hooks/use-notification';
import useTitle from '../../../../common/hooks/use-title';
import firebaseAuth from '../../infrastructure/firebase/firebase.config';
import PasswordInput from '../../../../common/components/password-input/password-input';

type ResetPasswordProps = {
  closeResetPassword: Dispatch<SetStateAction<boolean>>;
  mode?: string;
};

type Email = {
  email: string;
};

type Password = {
  password: string;
  confirmation: string;
};

const ResetPassword = forwardRef(
  (
    { closeResetPassword, mode, ...rest }: ResetPasswordProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const notify = useNotification();
    useTitle('Criar nova senha');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const emailForm = useForm<Email>({
      defaultValues: {
        email: 'guilherme.lmoraes.devel@gmail.com',
      },
      mode: 'all',
      resolver: yupResolver(
        object({
          email: string()
            .email('E-mail inválido')
            .required('Campo obrigatório'),
        })
      ),
    });

    const resetPassword = async ({ email }: Email) => {
      try {
        await sendPasswordResetEmail(firebaseAuth, email);
        notify({
          type: 'success',
          title: 'E-mail enviado com sucesso',
          message: `Um e-mail foi enviado para ${email} para redefinição de senha.`,
        });
      } catch (error) {
        const errorCode = (error as AuthError).code;

        if (errorCode === AuthErrorCodes.USER_DELETED) {
          emailForm.setError('email', { message: 'Usuário não encontrado' });
          return;
        }

        notify({
          title: 'Erro interno',
          message:
            'Falha ao redefinir senha. Por favor, tente novamente mais tarde',
          type: 'error',
        });
      }
    };

    const passwordForm = useForm<Password>({
      defaultValues: {
        password: '',
        confirmation: '',
      },
      mode: 'all',
      resolver: yupResolver(
        object({
          password: string()
            .required('Campo obrigatório')
            .min(8, 'Senha deve conter, no mínimo, oito caracteres')
            .max(80, 'Senha deve conter, no máximo, oitenta caracteres'),
          confirmation: string()
            .required('Campo obrigatório')
            .min(8, 'Senha deve conter, no mínimo, oito caracteres')
            .max(80, 'Senha deve conter, no máximo, oitenta caracteres')
            .oneOf([YupRef('password')], 'Senha e confirmação diferentes'),
        })
      ),
    });

    const emailTemplate = (
      <form onSubmit={emailForm.handleSubmit(resetPassword)}>
        <TextField
          type="email"
          label="E-mail *"
          {...emailForm.register('email')}
          {...commonTextFieldProps(emailForm.formState, 'email')}
        />
        <Button
          variant="contained"
          color="success"
          fullWidth
          disabled={
            !emailForm.formState.isValid || emailForm.formState.isSubmitting
          }
          type="submit"
        >
          Enviar e-mail
        </Button>
      </form>
    );

    const passwordTemplate = (
      <div>
        <form>
          <PasswordInput
            label="Nova senha *"
            formState={passwordForm.formState}
            field="password"
            visible={passwordVisible}
            setVisible={setPasswordVisible}
            {...passwordForm.register('password')}
          />
          <PasswordInput
            label="Confirmação"
            formState={passwordForm.formState}
            field="confirmation"
            visible={passwordVisible}
            setVisible={setPasswordVisible}
            {...passwordForm.register('confirmation')}
          />
        </form>
      </div>
    );

    return (
      <div className="p-3" ref={ref} {...rest}>
        <header>
          <Button
            onClick={() => closeResetPassword(false)}
            startIcon={<ArrowBackIcon />}
            classes={{ root: 'mb-3' }}
          >
            Voltar
          </Button>
          <Typography variant="subtitle1" classes={{ root: 'mb-3' }}>
            RECUPERAÇÃO DE SENHA
          </Typography>
        </header>
        {mode === 'resetPassword' ? passwordTemplate : emailTemplate}
      </div>
    );
  }
);

export default ResetPassword;
