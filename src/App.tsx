import { Route, Routes } from "react-router-dom";
import { Hero } from "./pages/Hero";
import { AddGame } from "./pages/AddGame";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/add" element={<AddGame />} />
      </Routes>
    </>
  );
}

export default App;
