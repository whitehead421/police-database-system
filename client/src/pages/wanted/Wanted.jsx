import "./wanted.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Popup from "../../components/popup/Popup";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { addWantedRecord, deleteWantedRecord } from "../../helpers/apiCalls";
import useFetch from "../../hooks/useFetch";
import DeleteIcon from "@mui/icons-material/Delete";

const Wanted = () => {
  const [trigger, setTrigger] = useState(false);
  const [reportPop, setReportPop] = useState({});
  const [descTrigger, setDescTrigger] = useState(false);
  const { user } = useContext(AuthContext);
  const { data: wanteds, reFetch } = useFetch("/api/wanteds");

  const handleAddWantedRecord = (e) => {
    e.preventDefault();
    let wantedRecord = {};
    for (let i = 0; i < 6; i++) {
      wantedRecord[e.target[i].name] = e.target[i].value;
    }
    wantedRecord["priority"] = parseInt(wantedRecord["priority"]);

    wantedRecord["officerName"] = user.name + " " + user.surname;

    if (wantedRecord["photo"] === "") {
      delete wantedRecord.photo;
    }

    addWantedRecord(wantedRecord).then(() => {
      setTrigger(false);
      reFetch();
    });

    console.log(wantedRecord);
  };

  const levels = {
    1: "lowLevel",
    2: "midLevel",
    3: "highLevel",
  };

  const levelsText = {
    1: "lowLevelText",
    2: "midLevelText",
    3: "highLevelText",
  };

  return (
    <div className="wanted">
      <Sidebar />
      <div className="wantedContainer">
        <Navbar />
        <div className="wantedWidgets">
          <AddIcon
            className="addWantedRecord"
            onClick={() => setTrigger(true)}
          />
          {wanteds
            .slice(0)
            .reverse()
            .map((item, index) => (
              <div className="wantedItem" key={index}>
                <div
                  className="wantedItemTop"
                  onClick={() => {
                    setReportPop(item);
                    setDescTrigger(true);
                  }}
                >
                  <img src={item.photo} alt="" />
                  <div className={"wantedLevel " + levels[item.priority]}></div>
                </div>
                <div className="wantedItemBottom">
                  <span className={"wantedName " + levelsText[item.priority]}>
                    {item.name}
                  </span>
                  <span className="wantedDate">{item.reason}</span>
                  <span className="wantedDate">{item.createdAt}</span>
                </div>
              </div>
            ))}
          <Popup trigger={trigger} setTrigger={setTrigger}>
            <div className="wantedPopup">
              <span className="addWantedTitle">ARANMA KAYDI EKLE</span>
              <form className="addWantedForm" onSubmit={handleAddWantedRecord}>
                <input type="text" placeholder="İsim" name="name" />
                <input type="text" placeholder="Aranma sebebi" name="reason" />
                <input
                  type="text"
                  placeholder="Son görülme yeri"
                  name="lastSeen"
                />
                <input
                  type="text"
                  placeholder="Kişinin fotoğrafı"
                  name="photo"
                />
                <textarea
                  type="text"
                  placeholder="Açıklama (varsa)"
                  name="desc"
                />
                <select name="priority">
                  <option value={1}>Düşük</option>
                  <option value={2}>Orta</option>
                  <option value={3}>Yüksek</option>
                </select>
                <button type="submit" className="addWantedButton">
                  Ekle
                </button>
              </form>
            </div>
          </Popup>
          <Popup trigger={descTrigger} setTrigger={setDescTrigger}>
            <div className="wantedPopup">
              {reportPop.desc ? (
                <div className="popWantedItem">
                  <span className="popWantedTitle">
                    Aranma Kaydı Açıklaması
                  </span>
                  <p className="popWantedP">{reportPop.desc}</p>
                </div>
              ) : null}
              <div className="popWantedItem">
                <span className="popWantedTitle">
                  Aranma Kaydını Ekleyen Memur
                </span>
                <p className="popWantedP">{reportPop.officerName}</p>
              </div>
              <div className="popWantedItem">
                <span className="popWantedTitle">
                  Aranma Kaydının Eklenme Tarihi
                </span>
                <p className="popWantedP">{reportPop.createdAt}</p>
              </div>

              {user.rankNo >= 8 ||
              reportPop.officerName === user.name + " " + user.surname ? (
                <div
                  className="popupWantedDelete"
                  onClick={() => {
                    setDescTrigger(false);
                    deleteWantedRecord(reportPop._id).then(() => {
                      reFetch();
                    });
                  }}
                >
                  <DeleteIcon className="deleteIcon" />
                </div>
              ) : null}
            </div>
          </Popup>
        </div>
      </div>
      <img
        src="https://cdn.discordapp.com/attachments/931964939374051328/1031594153563394128/unknown.png"
        alt=""
        className="maptohover"
      />
    </div>
  );
};

export default Wanted;
