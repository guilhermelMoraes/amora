import { BaseTextFieldProps } from '@mui/material/TextField';
import { FieldValues, FormState } from 'react-hook-form';

const commonTextFieldProps = <
  TInput extends FieldValues = Record<string, unknown>
>(
  formState: FormState<TInput>,
  field: keyof TInput
): BaseTextFieldProps => ({
  variant: 'outlined',
  size: 'small',
  autoComplete: 'off',
  disabled: formState.isSubmitting,
  helperText: formState.errors[field]
    ? String(formState.errors[field]?.message)
    : ' ',
  FormHelperTextProps: {
    classes: { root: 'text-truncate' },
    title: formState.errors[field]
      ? String(formState.errors[field]?.message)
      : ' ',
  },
  error: Boolean(formState.errors[field]),
  classes: { root: 'mb-3' },
});

export default commonTextFieldProps;
