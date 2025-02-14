import { useNavigate } from "react-router-dom";

const Navbar = ({ city }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <button onClick={() => navigate(-1)}>⬅ Back</button>
      <h2>{city}</h2>
    </div>
  );
};

export default Navbar;
