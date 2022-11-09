import { Dispatch, ForwardedRef, forwardRef, SetStateAction } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import useTitle from '../../../../common/hooks/use-title';

type ResetPasswordProps = {
  closeResetPassword: Dispatch<SetStateAction<boolean>>;
};

const ResetPassword = forwardRef(
  (
    { closeResetPassword, ...rest }: ResetPasswordProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    useTitle('Criar nova senha');

    return (
      <div ref={ref} {...rest}>
        <IconButton onClick={() => closeResetPassword(false)}>
          <ArrowBackIcon />
        </IconButton>
        teste
      </div>
    );
  }
);

export default ResetPassword;
