import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainPage from "./pages/MainPage";
import SharePage from "./pages/SharePage";
import { useEffect } from "react";
import { useGlobals } from "./contexts/Globals";
import "./App.css";

function App() {
  const { setWindowWidth } = useGlobals();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main/*" element={<MainPage />} />
        <Route path="/share/*" element={<SharePage />} />
      </Routes>
    </div>
  );
}

export default App;
