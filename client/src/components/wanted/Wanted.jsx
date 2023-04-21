import "./wanted.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { deleteWantedRecord } from "../../helpers/apiCalls";
import Popup from "../popup/Popup";

const Wanted = ({ wanted, reFetch }) => {
  const [trigger, setTrigger] = useState(false);
  const { user } = useContext(AuthContext);
  return (
    <div className="wantedWidget">
      <div className="info">
        <span className="araniyor">ARANIYOR</span>
        <div className="avatar">
          <img src={wanted.photo} alt="avatar" className="avatar" />
        </div>
        <div className="wantedWidgetName">
          <span>{wanted.name}</span>
        </div>
        <div className="wantedWidgetReason">
          <span>{wanted.reason}</span>
        </div>
        <div className="lastSeen">
          <span>{wanted.lastSeen}</span>
        </div>
        <div className="officer">
          <span>Polis: {wanted.officerName}</span>
        </div>
        <Popup trigger={trigger} setTrigger={setTrigger}>
          <div className="popupWantedWidget">
            <div className="popupWantedPhoto">
              <img
                src={wanted.photo}
                alt="avatar"
                className="popupWantedWidgetAvatar"
              />
            </div>
            <div className="popupWantedWidgetName">
              <span>{wanted.name}</span>
            </div>
            <div className="popupWantedWidgetDesc">
              <span>{wanted.desc}</span>
            </div>
          </div>
        </Popup>
      </div>
      <div className="action">
        <div className="see" onClick={() => setTrigger(!trigger)}>
          <span>Görüntüle</span>
        </div>
        {user.rankNo >= 8 ||
        user.name + " " + user.surname === wanted.officerName ? (
          <div
            className="delete"
            onClick={() =>
              deleteWantedRecord(wanted._id).then(() => {
                reFetch();
              })
            }
          >
            <span>Sil</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Wanted;
