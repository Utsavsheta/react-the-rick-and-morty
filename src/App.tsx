import React from "react";
import { Routes, Route } from "react-router-dom";
import CharactersPage from "./pages/characterPage/charactersPage";
import CharacterProfile from "./pages/characterProfilePage/characterProfile";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CharactersPage />} />
      <Route path="/character/:id" element={<CharacterProfile />} />
    </Routes>
  );
};

export default App;
