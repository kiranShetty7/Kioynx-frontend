import AuthLayout from "./pages/AuthLayout/AuthLayout";
import { SnackbarProvider } from "./context/SnackbarContext";

function App() {
  return (
    <SnackbarProvider>
      <div className="App">
        <AuthLayout />
      </div>
    </SnackbarProvider>
  );
}

export default App;
