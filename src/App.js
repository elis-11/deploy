import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { useDataContext } from "./contexts/DataProvider";
import { Navbar } from "./components/Navbar";
import {Login} from "./components/Login";
import { Dashboard } from "./components/Dashboard";

function App() {
  const { error } = useDataContext();

  return (
    <div className="App">
      <header>
        <div className="error">{error}</div>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route index element={<h2>My home is my library</h2>} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
