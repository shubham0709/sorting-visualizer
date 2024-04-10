import { Routes, Route } from "react-router-dom";
import AppLayout from "./app-layout/AppLayout";
import PlayGround from "./pages/playground/PlayGround";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<PlayGround />} />
      </Route>
    </Routes>
  );
}

export default App;
