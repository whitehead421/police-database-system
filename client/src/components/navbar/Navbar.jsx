import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const date = new Date();

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Ara..." />
          <SearchOutlinedIcon className="icon" />
        </div>
        <div className="date">
          <span>
            {date.toLocaleDateString("tr-TR", {
              weekday: "long",
            })}
            ,{" "}
            {date.toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="items">
          <div className="item">
            <span className="name">
              <span className="welcome">Hoşgeldiniz,</span> {user.name}{" "}
              {user.surname}
            </span>
          </div>
          <div className="item">
            {darkMode ? (
              <LightModeOutlinedIcon
                onClick={() => dispatch({ type: "TOGGLE" })}
                className="icon"
              />
            ) : (
              <DarkModeOutlinedIcon
                onClick={() => dispatch({ type: "TOGGLE" })}
                className="icon"
              />
            )}
          </div>
          <Link to={"/officers/" + user._id}>
            <div className="item">
              <AccountCircleOutlinedIcon className="icon" />
            </div>
          </Link>
          <div className="item">
            <img src={user.pp} alt="avatar" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
