import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";

import "../src/assets/fonts/fonts.css";

import Dashboard from "./pages/Dashboard";
import { VariablePanel } from "./components/VariablePanel/VariablePanel";
import AppProvider from "./provider/appProvider";


function App() {
  return (
    <Router>
      <AppProvider>
        <div className="h-[100svh] w-full bg-black flex font-inter">
          <Sidebar className="w-20 sm:block hidden h-full" />

          <div className="flex-1 flex flex-col">
            <Header />

            <main className="flex-1 flex">
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </main>
          </div>

          <VariablePanel />
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
