import "./sidebar.scss";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CampaignIcon from "@mui/icons-material/Campaign";
import PersonIcon from "@mui/icons-material/Person";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import LogoutIcon from "@mui/icons-material/Logout";
import WalletIcon from "@mui/icons-material/Wallet";
// import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RateReviewIcon from "@mui/icons-material/RateReview";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { publicRequest } from "../../helpers/requestMethods";
const Sidebar = () => {
  const navigate = useNavigate();
  const [nCount, setNCount] = useState(0);
  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    publicRequest.get("/api/auth/logout").then((res) => {
      navigate("/login");
      alert(res.data.msg);
    });
  };

  const { data: notifications } = useFetch("/api/announcements/");

  useEffect(() => {
    const readAnnouncementList = sessionStorage.getItem("readAnnouncementList");
    if (readAnnouncementList) {
      const readAnnouncementListArray = JSON.parse(readAnnouncementList);
      const unreadAnnouncementList = notifications.filter(
        (notification) => !readAnnouncementListArray.includes(notification._id)
      );
      setNCount(unreadAnnouncementList.length);
    } else {
      setNCount(notifications.length);
    }
  }, [notifications]);

  const { dispatch } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="top">
          <img
            src="https://i.hizliresim.com/hmttz34.png"
            className="logoimg"
            alt="logo"
          />
          <span className="logo">database</span>
        </div>
      </Link>
      <hr />
      <div className="center">
        <ul>
          <p className="title">GİRİŞ</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <AnalyticsIcon className="icon" />
              <span>Ana Sayfa</span>
            </li>
          </Link>
          <Link to="/announcements" style={{ textDecoration: "none" }}>
            <li>
              <div className="notification">
                <CampaignIcon className="icon" />
                {nCount > 0 && <span className="counter">{nCount}</span>}
              </div>
              <span>Duyurular</span>
            </li>
          </Link>
          <p className="title">EKLE</p>
          <Link to="/reports" style={{ textDecoration: "none" }}>
            <li>
              <RateReviewIcon className="icon" />
              <span>Rapor Oluştur</span>
            </li>
          </Link>

          {user.rankNo >= 8 && (
            <>
              <p className="title">HIGH COMMAND</p>
              <Link to="/officers" style={{ textDecoration: "none" }}>
                <li>
                  <PersonIcon className="icon" />
                  <span>Personel Yönetimi</span>
                </li>
              </Link>

              <Link to="/internal" style={{ textDecoration: "none" }}>
                <li>
                  <CreateNewFolderIcon className="icon" />
                  <span>IA Yönetim</span>
                </li>
              </Link>
            </>
          )}
          <p className="title">GENEL</p>
          <Link to="/wanted" style={{ textDecoration: "none" }}>
            <li>
              <PermContactCalendarIcon className="icon" />
              <span>Arananlar</span>
            </li>
          </Link>
          {user.rankNo >= 8 || user.isFTO ? (
            <Link to="/fts" style={{ textDecoration: "none" }}>
              <li>
                <SummarizeIcon className="icon" />
                <span>FTS Raporları</span>
              </li>
            </Link>
          ) : null}
          <Link to="/event" style={{ textDecoration: "none" }}>
            <li>
              <SummarizeIcon className="icon" />
              <span>Olay Raporları</span>
            </li>
          </Link>
          <Link to="/licenses" style={{ textDecoration: "none" }}>
            <li>
              <WalletIcon className="icon" />
              <span>Ruhsatlar</span>
            </li>
          </Link>
          <li>
            <ContentPasteIcon className="icon" />
            <span>Ceza Kanunu</span>
          </li>
          <p className="title">AYARLAR</p>
          <Link to={"/officers/" + user._id} style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleIcon className="icon" />
              <span>Profil Yönetimi</span>
            </li>
          </Link>
          <li onClick={handleLogOut}>
            <LogoutIcon className="icon" />
            <span>Çıkış</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOptions">
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "LIGHT" })}
          ></div>
          <div
            className="colorOption"
            onClick={() => dispatch({ type: "DARK" })}
          ></div>
        </div>
        <div className="sidebarInfo">
          <span className="version">v0.8.2(alpha)</span>
          <span className="version">by whitehead#1001</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
