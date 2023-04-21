import "./announcement.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import useFetch from "../../hooks/useFetch";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../../components/popup/Popup";
import { useContext, useState, useEffect } from "react";
import { useRef } from "react";
import { addAnnouncement, deleteAnnouncement } from "../../helpers/apiCalls";
import { AuthContext } from "../../context/AuthContext";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const Announcement = () => {
  const { user } = useContext(AuthContext);
  const [trigger, setTrigger] = useState(false);
  const {
    data: announcements,
    loading,
    reFetch,
  } = useFetch("/api/announcements");

  useEffect(() => {
    const announcementList = announcements.map((announcement) => {
      return announcement._id;
    });
    sessionStorage.setItem(
      "readAnnouncementList",
      JSON.stringify(announcementList)
    );
  }, [announcements]);

  const announcementTitle = useRef();
  const announcementContent = useRef();

  const handleAddAnnouncement = async () => {
    const title = announcementTitle.current.value;
    const content = announcementContent.current.value;

    try {
      await addAnnouncement({
        title: title,
        duyuru: content,
        adder: user.pp,
        adderName: user.name + " " + user.surname,
      }).then(() => reFetch());
      setTrigger(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="announcement">
      <Sidebar />
      <div className="announcementContainer">
        <Navbar />
        <div className="announcementWidgets">
          <RefreshIcon
            className="refreshAnnouncement"
            onClick={() => {
              reFetch();
              alertify.success("Duyurular yenilendi!");
            }}
          />
          {user.rankNo >= 8 && (
            <AddIcon
              className="addAnnouncement"
              onClick={() => setTrigger(true)}
            />
          )}
          {announcements
            .slice(0)
            .reverse()
            .map((a, index) => (
              <div
                key={index}
                className="widgetWrapper"
                onClick={() => {
                  alertify.alert(a.title, a.duyuru).set({
                    transition: "fade",
                    message: a.duyuru,
                    movable: false,
                  });
                }}
              >
                {user.rankNo >= 8 && (
                  <div
                    key={a.title}
                    className="deleteButton"
                    onClick={() =>
                      deleteAnnouncement(a._id).then(() => reFetch())
                    }
                  >
                    <BookmarkRemoveIcon />
                  </div>
                )}
                <div className="adderProfile">
                  <img
                    src={a.adder}
                    alt="Announcement Adder"
                    className="profilePic"
                  />
                  <div className="nameDate">
                    <span className="adderName">{a.adderName}</span>
                    <span className="date">{a.createdAt}</span>
                  </div>
                </div>
                <Widget key={a._id} announcement={a} isAnnon={true} />
              </div>
            ))}
          {trigger && (
            <Popup trigger={trigger} setTrigger={setTrigger}>
              <h1 className="titleAnnouncement">DUYURU EKLE</h1>
              <div className="form">
                <input
                  type="text"
                  className="announcementTitle "
                  placeholder="Duyuru başlığını giriniz."
                  ref={announcementTitle}
                />
                <textarea
                  className="announcementContent"
                  placeholder="Duyuru içeriğini giriniz."
                  ref={announcementContent}
                />
                <button
                  className="addAnnouncementButton"
                  onClick={handleAddAnnouncement}
                  disabled={loading}
                >
                  EKLE
                </button>
              </div>
            </Popup>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
