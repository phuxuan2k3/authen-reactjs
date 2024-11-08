import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "../pages/Profile";

export default function AppRouter() {
  return (
    <Router basename="/authen-reactjs/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
