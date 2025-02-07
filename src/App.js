import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute"; 
import NotRegistered from "./pages/NotRegistered";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element=
          {
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/not-registered" element={<NotRegistered />} />
      </Routes>
    </Router>
  );
}

export default App;
