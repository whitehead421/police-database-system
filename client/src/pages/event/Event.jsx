import "./event.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import Datatable from "../../components/Datatable/Datatable";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import Popup from "../../components/popup/Popup";
import { deleteReport } from "../../helpers/apiCalls";
const Event = () => {
  const { data: events, loading } = useFetch("/api/reports/type/olay");
  const { user } = useContext(AuthContext);
  const [trigger, setTrigger] = useState(false);
  const [report, setReport] = useState(null);
  const columns = [
    {
      field: "officer",
      headerName: "Raporu Yazan",
      width: 180,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "title",
      headerName: "Başlık",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "createdAt",
      headerName: "Oluşturulma Tarihi",
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
                setReport(params.row);
                setTrigger(true);
              }}
            >
              İncele
            </button>
            {user.rankNo >= 8 ||
            user.name + " " + user.surname === params.row.officer ? (
              <button
                className="userListDelete"
                onClick={() => deleteReport(params.row._id)}
              >
                Sil
              </button>
            ) : null}
          </div>
        );
      },
    },
  ];
  return (
    <div className="event">
      <Sidebar />
      <div className="eventContainer">
        <Navbar />
        <Datatable data={events} columns={columns} loading={loading} />
      </div>
      <Popup trigger={trigger} setTrigger={setTrigger}>
        {report ? (
          <div className="popupReport">
            <div className="pdTitle">
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                CITY OF LOS SANTOS
              </span>
              <span>MISSION ROW POLICE DEPARTMENT</span>
            </div>
            <div className="previewContent">
              <div className="previewDate">
                <b>Tarih:</b> {report.createdAt}
              </div>
              <div className="previewTitle">
                <b>Hakkında rapor tutulan kişi: </b>
                {report?.title}
              </div>
              <div className="previewDesc">
                <b>Detaylar:</b> {report?.report}
              </div>
              <div className="previewTags">
                <b>Olayda Bulunan Memurlar: </b>
              </div>
              <div className="previewPhotos">
                <b>Fotoğraflar: </b>
                {report?.photos.map((photo, index) => (
                  <img
                    src={photo}
                    alt="previewPhoto"
                    key={index}
                    className="previewPhoto"
                    onClick={() => window.open(photo)}
                  />
                ))}
              </div>
            </div>
            <div className="previewFooter">
              <div className="wrapper">
                <div>{report?.officer}</div>
                <div className="previewSign">
                  {report?.officer[0]}. {report?.officer.split(" ")[1]}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Popup>
    </div>
  );
};

export default Event;
