import { Route, Routes } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Routes>
      <Route path="/" element={<HomePage theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
