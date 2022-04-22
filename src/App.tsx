import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { FormInput } from "./components/FormInput";

function App() {
  //Recommended to extract this instance in new file, so we can resuse
  //this while creating query provider wrapper for testing.
  const client = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <FormInput name="hi">
          <FormInput.Label text="Name" />
          <FormInput.Input value="Surendra" onChange={() => console.log("")} />
        </FormInput>
      </QueryClientProvider>
    </div>
  );
}

export default App;
