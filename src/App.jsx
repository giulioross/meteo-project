import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/home";
import WeatherDetails from "./component/WeatherDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:city" element={<WeatherDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
