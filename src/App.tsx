import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

function App() {
  //Recommended to extract this instance in new file, so we can resuse
  //this while creating query provider wrapper for testing.
  const client = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={client}></QueryClientProvider>
    </div>
  );
}

export default App;
