import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  InputBase,
  InputBaseProps,
  Paper,
  PaperProps,
  SxProps,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffectAfterMount } from "../hooks/common/useEffectAfterMount";

type CommonProps = {
  sx?: SxProps;
  style?: React.CSSProperties;
  className?: string;
};
type FormProps = {
  children: React.ReactNode;
  name: string;
  value?: string | null;
  handleChange?: (value: string) => void;
};

type LabelProps = CommonProps & {
  text: string;
};

type FormInputProps = Omit<
  InputBaseProps,
  "name" | "id" | "value" | "onChange"
> & {
  containerSx?: SxProps;
  paperProps?: PaperProps;
};

type FormContextType = {
  name: string;
  value: string;
  setValue: (value: React.ChangeEvent<HTMLInputElement>) => void;
};
const FormInputContext = React.createContext({} as FormContextType);

export const FormInput = ({
  children,
  name,
  value = null,
  handleChange,
}: FormProps) => {
  const [formValue, setFormValue] = useState("");

  //Determining Whether the component is controlled by react or not.
  const isControlled = value && handleChange;
  const val = isControlled ? value : formValue;
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      isControlled ? handleChange(value) : setFormValue(value);
    },
    [isControlled, handleChange]
  );

  useEffectAfterMount(() => {
    if (!isControlled) {
      handleChange && handleChange(formValue);
    }
  }, [formValue, handleChange, isControlled]);

  const values = useMemo(
    () => ({ name, value: val, setValue: handleOnChange }),
    [name, val, handleOnChange]
  );

  return (
    <FormInputContext.Provider value={values}>
      <Box sx={{ width: 500, display: "flex", flexDirection: "column" }}>
        {children}
      </Box>
    </FormInputContext.Provider>
  );
};

const Label = ({ text, sx: s = {}, ...otherProps }: LabelProps) => {
  const { name } = useContext(FormInputContext);
  return (
    <Typography
      component="label"
      textAlign="start"
      htmlFor={name}
      sx={{
        fontWeight: "bold",
        fontSize: 14,
        ...s,
      }}
      {...otherProps}
    >
      {text}
    </Typography>
  );
};

const Input = ({
  placeholder,
  paperProps = {},
  containerSx = {},
  ...otherProps
}: FormInputProps) => {
  const { name, value, setValue } = useContext(FormInputContext);
  return (
    <Paper
      elevation={0}
      sx={{
        width: 500,
        display: "flex",
        alignItems: "center",
        p: "6px 8px",
        border: "1px solid #333",
        borderRadius: 2,
        mt: 0.6,
        ...containerSx,
      }}
      {...paperProps}
    >
      <InputBase
        placeholder={placeholder}
        id={name}
        name={name}
        sx={{ flex: 1 }}
        value={value}
        onChange={setValue}
        {...otherProps}
      />
    </Paper>
  );
};

FormInput.Label = Label;
FormInput.Input = Input;
