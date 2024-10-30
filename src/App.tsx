import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
// import Register from "./pakges/Register";

function App() {
  return (
    <Router basename="/authen-reactjs/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/register" component={Register} /> */}
      </Routes>
    </Router>
  );
}

export default App;
