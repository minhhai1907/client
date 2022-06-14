import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import React from "react";

function FSelect({ name, children, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
// name={name}
// control={control}
// render={({ field, fieldState: { error } }) => (
//   <TextField 
//   {...field}
//     fullWidth
//     error={!!error}
//     helperText={error?.message}
//     {...other}
//   />
// )}
// />
export default FSelect;