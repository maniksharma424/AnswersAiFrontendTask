import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../src/assets/fonts/fonts.css";

import Dashboard from "./pages/Dashboard";

import AppProvider from "./provider/appProvider";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <AppProvider>
        <div className="h-[100svh] w-full bg-black flex font-inter">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
