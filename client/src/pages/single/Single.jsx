import "./single.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import useFetch from "../../hooks/useFetch";
import Popup from "../../components/popup/Popup";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { updateOfficer } from "../../helpers/apiCalls";
import { Switch } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Single = () => {
  const params = useParams();
  const { user } = useContext(AuthContext);
  const [trigger, setTrigger] = useState(false);

  const { data: statistics } = useFetch(
    `/api/officers/statistics/${params.id}`
  );

  const {
    data: officer,
    loading,
    reFetch,
  } = useFetch(`/api/officers/${params.id}`);

  const handleUpdate = async (e) => {
    e.preventDefault();
    let rankNo = {
      Captain: 12,
      "Lieutenant II": 11,
      "Lieutenant I": 10,
      "Detective III": 9,
      "Detective II": 7,
      "Detective I": 5,
      "Sergeant II": 8,
      "Sergeant I": 6,
      "Police Officer III+I": 4,
      "Police Officer III": 3,
      "Police Officer II": 2,
      "Police Officer I": 1,
    };
    const officer = {};
    for (let i = 0; i < 6; i++) {
      officer[e.target[i].name] = e.target[i].value;
    }
    officer.rankNo = rankNo[officer.rank];
    officer.isFTO = e.target[3].checked;
    console.log(officer);
    updateOfficer(params.id, officer).then(() => reFetch());
    setTrigger(false);
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className={loading ? "left loading" : "left"}>
            {user.rankNo >= 8 ? (
              <div className="editButton" onClick={() => setTrigger(true)}>
                Düzenle
              </div>
            ) : null}
            <Popup trigger={trigger} setTrigger={setTrigger}>
              <div className="updateOfficer">
                <h3 className="title">
                  Memurun Bilgilerini Düzenle: {officer?.name}{" "}
                  {officer?.surname}
                </h3>
                <form className="updateForm" onSubmit={handleUpdate}>
                  <label>İsim</label>
                  <input
                    type="text"
                    className="name"
                    name="name"
                    defaultValue={officer?.name}
                    placeholder={officer?.name}
                  />
                  <label>Soyisim</label>
                  <input
                    type="text"
                    name="surname"
                    className="surname"
                    defaultValue={officer?.surname}
                    placeholder={officer?.surname}
                  />
                  <label>Rütbe</label>
                  <select
                    className="rank"
                    name="rank"
                    defaultValue={officer?.rank}
                  >
                    <option value="Captain">Captain</option>
                    <option value="Lieutenant II">Lieutenant II</option>
                    <option value="Lieutenant I">Lieutenant I</option>
                    <option value="Detective III">Detective III</option>
                    <option value="Sergeant II">Sergeant II</option>
                    <option value="Detective II">Detective II</option>
                    <option value="Sergeant I">Sergeant I</option>
                    <option value="Detective I">Detective I</option>
                    <option value="Police Officer III+I">
                      Police Officer III+I
                    </option>
                    <option value="Police Officer III">
                      Police Officer III
                    </option>
                    <option value="Police Officer II">Police Officer II</option>
                    <option value="Police Officer I">Police Officer I</option>
                  </select>

                  <label>FTO</label>
                  <Switch
                    name="isFTO"
                    defaultChecked={officer?.isFTO}
                    color="secondary"
                  />

                  <label>Rozet Numarası</label>
                  <input
                    type="text"
                    name="badge"
                    className="badge"
                    defaultValue={officer?.badge}
                    placeholder={officer?.badge}
                  />
                  <label>
                    Fotoğraf URL Adresi{" "}
                    <i>(Kare fotoğraf yüklemeniz rica olunur.)</i>
                  </label>
                  <input
                    type="text"
                    name="pp"
                    className="pp"
                    placeholder={officer?.pp}
                    defaultValue={officer?.pp}
                  />
                  <div className="buttonContainer">
                    <button
                      className="cancelBtn"
                      type="button"
                      onClick={() => setTrigger(false)}
                    >
                      İPTAL
                    </button>
                    <button className="addOfficer" type="submit">
                      GÜNCELLE
                    </button>
                  </div>
                </form>
              </div>
            </Popup>
            <h1 className="title">Personel Bilgisi</h1>
            <div className="item">
              <img src={officer?.pp} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">
                  {officer.name} {officer.surname}
                </h1>
                <div className="detailItem">
                  <span className="itemKey">Rütbe:</span>
                  <span className="itemValue">{officer.rank}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Badge Number:</span>
                  <span className="itemValue">{officer.badge}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="chartTitle">Son 7 günde yazılan rapor sayısı</div>

            <AreaChart
              width={730}
              height={250}
              data={statistics}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorFts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorIa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOlay" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ca8282" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ca8282" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
              <Tooltip />
              <Area
                type="monotone"
                name="FTS Raporu"
                dataKey="fts"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorFts)"
              />
              <Area
                type="monotone"
                name="IA Raporu"
                dataKey="ia"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorIa)"
              />
              <Area
                type="monotone"
                name="Olay Raporu"
                dataKey="olay"
                stroke="#ca8282"
                fillOpacity={1}
                fill="url(#colorOlay)"
              />
            </AreaChart>
          </div>
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  );
};

export default Single;
