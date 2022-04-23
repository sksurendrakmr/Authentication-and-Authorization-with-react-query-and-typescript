import { Box } from "@mui/material";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { FormInput } from "./components/FormInput";

function App() {
  //Recommended to extract this instance in new file, so we can resuse
  //this while creating query provider wrapper for unit testing.
  const client = new QueryClient();
  const [value, setValue] = useState("");
  console.log("Form value", value);

  // const handleChange = (value: string) => {
  //   setValue(value);
  // };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <QueryClientProvider client={client}>
        <FormInput name="hi" handleChange={setValue}>
          <FormInput.Label text="Name" />
          <FormInput.Input />
        </FormInput>
      </QueryClientProvider>
    </Box>
  );
}

export default App;
