import "./list.scss";
import { useNavigate } from "react-router-dom";
import { addOfficer, deleteOfficer } from "../../helpers/apiCalls";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "../../components/Datatable/Datatable";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import Popup from "../../components/popup/Popup";
import { Switch } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const OfficerList = () => {
  const { data: officers, loading, reFetch } = useFetch("/api/officers");
  const navigate = useNavigate();
  const [trigger, setTrigger] = useState(false);

  const { user } = useContext(AuthContext);

  const handleAddOfficer = async (e) => {
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
    for (let i = 0; i < 8; i++) {
      officer[e.target[i].name] = e.target[i].value;
      if (e.target[i].name === "isFTO") {
        console.log(i);
      }
    }
    officer.rankNo = rankNo[officer.rank];
    officer.isFTO = e.target[7].checked;
    console.log(officer);
    if (officer.pp === "") {
      delete officer.pp;
    }
    addOfficer(officer).then(() => reFetch());
    // setTrigger(false);
  };

  const columns = [
    {
      field: "pp",
      headerName: "PP",
      width: 100,
      sortable: false,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div className="datatableUser">
            <img src={params.row.pp} alt="avatar" className="avatar" />
          </div>
        );
      },
    },

    {
      field: "badge",
      headerName: "Rozet Numarası",
      width: 180,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "name",
      headerName: "Adı Soyadı",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: false,
      renderCell: (params) => {
        return (
          <div className="datatable__user">
            {params.row.name} {params.row.surname}
          </div>
        );
      },
    },
    {
      field: "rankNo",
      headerName: "Rütbe No",
      type: "number",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "rank",
      headerName: "Rütbe",
      sortable: false,
      width: 180,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
    },
    {
      field: "action",
      headerName: "İşlemler",
      width: 300,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="actionCell">
            <button
              className="userListEdit"
              onClick={() => {
                navigate("/officers/" + params.row._id);
              }}
            >
              İncele
            </button>
            <button
              className="userListDelete"
              onClick={() =>
                deleteOfficer(params.row._id).then(() => reFetch())
              }
            >
              Tenzil
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="listWrapper">
          {user.rankNo >= 8 ? (
            <AddCircleIcon
              className="addOfficer"
              onClick={() => setTrigger(true)}
            />
          ) : null}
          <Datatable
            data={officers}
            loading={loading}
            columns={columns}
            getRowId={(row) => row._id}
          />
        </div>
        <Popup trigger={trigger} setTrigger={setTrigger}>
          <h3>Yeni Memur</h3>
          <div className="popupOfficerContainer">
            <form className="popupOfficerForm" onSubmit={handleAddOfficer}>
              <label>Adı</label>
              <input name="name" type="text" placeholder="Adı" />
              <label>Soyadı</label>
              <input name="surname" type="text" placeholder="Soyadı" />
              <label>Rozet Numarası</label>
              <input name="badge" type="text" placeholder="Rozet Numarası" />
              <label>Rütbe</label>
              <select className="rank" name="rank">
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
                <option value="Police Officer III">Police Officer III</option>
                <option value="Police Officer II">Police Officer II</option>
                <option value="Police Officer I">Police Officer I</option>
              </select>
              <label>PP</label>
              <input name="pp" type="text" placeholder="PP" />
              <label>Kullanıcı Adı</label>
              <input name="username" type="text" placeholder="Kullanıcı Adı" />
              <label>Şifre</label>
              <input name="password" type="password" placeholder="Şifre" />
              <label>FTO mu?</label>
              <Switch name="isFTO" color="secondary" />
              <button className="popupButton" type="submit">
                Kaydet
              </button>
            </form>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default OfficerList;
