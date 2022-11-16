import {
  Dispatch,
  ForwardedRef,
  forwardRef,
  SetStateAction,
  useState,
} from 'react';
import { FormState } from 'react-hook-form';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import commonTextFieldProps from '../../helpers/common-input-props';

type PasswordInputProps = {
  label: string;
  formState: FormState<any>;
  field: string;
  visible?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
};

const PasswordInput = forwardRef(
  (
    {
      field,
      formState,
      label,
      visible,
      setVisible,
      ...rest
    }: PasswordInputProps,
    reactRef: ForwardedRef<HTMLDivElement>
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const getVisibilityState = (): boolean => {
      if (visible === undefined) {
        return passwordVisible;
      }
      return visible;
    };

    const setVisibilityState = (state: boolean) => {
      if (typeof setVisible === 'function') {
        setVisible(state);
        return;
      }

      setPasswordVisible(state);
    };

    const inputType = getVisibilityState() ? 'text' : 'password';
    const passwordInputIcon = getVisibilityState() ? (
      <VisibilityIcon />
    ) : (
      <VisibilityOffIcon />
    );

    const passwordInputText = getVisibilityState()
      ? 'Esconder senha'
      : 'Exibir senha';
    const passwordAdornment = () => (
      <InputAdornment position="end">
        <IconButton
          aria-label={passwordInputText}
          onClick={() => setVisibilityState(!getVisibilityState())}
        >
          {passwordInputIcon}
        </IconButton>
      </InputAdornment>
    );

    return (
      <TextField
        type={inputType}
        label={label}
        ref={reactRef}
        InputProps={{
          endAdornment: passwordAdornment(),
        }}
        {...commonTextFieldProps(formState, field)}
        {...rest}
      />
    );
  }
);

export default PasswordInput;
