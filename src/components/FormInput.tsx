import React, { useContext, useMemo } from "react";
import {
  InputBase,
  InputBaseProps,
  Paper,
  PaperProps,
  SxProps,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

type CommonProps = {
  sx?: SxProps;
  style?: React.CSSProperties;
  className?: string;
};
type FormProps = {
  children: React.ReactNode;
  name: string;
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
  value: unknown;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

type FormContextType = {
  name: string;
};
const FormInputContext = React.createContext({} as FormContextType);

export const FormInput = ({ children, name }: FormProps) => {
  const values = useMemo(() => ({ name }), [name]);
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
  value,
  onChange,
  placeholder,
  paperProps = {},
  containerSx = {},
  ...otherProps
}: FormInputProps) => {
  const { name } = useContext(FormInputContext);
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
        onChange={onChange}
        {...otherProps}
      />
    </Paper>
  );
};

FormInput.Label = Label;
FormInput.Input = Input;
