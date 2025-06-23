import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";

import "../src/assets/fonts/fonts.css";

import Dashboard from "./pages/Dashboard";
import { VariablePanel } from "./components/VariablePanel/VariablePanel";
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
          </Routes>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
