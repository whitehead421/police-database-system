import "./licenseList.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Datatable from "../../components/Datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import Popup from "../../components/popup/Popup";
import { deleteLicense, createLicense } from "../../helpers/apiCalls";
import alertify from "alertifyjs";
import { AuthContext } from "../../context/AuthContext";

const LicenseList = () => {
  const { data: licenses, loading, reFetch } = useFetch("/api/licenses");

  const { user } = useContext(AuthContext);

  const columns = [
    {
      field: "pp",
      headerName: "PP",
      width: 80,
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
      field: "fullName",
      headerName: "Adı Soyadı",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "createdAt",
      headerName: "Başlangıç Tarihi",
      width: 250,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "expireDate",
      headerName: "Bitiş Tarihi",
      width: 250,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "action",
      headerName: "İşlemler",
      width: 150,
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
                alertify
                  .alert(
                    "Lisans Bilgileri",
                    `
                  <div class="alertifyContent">
                    <div class="alertifyTop">
                      <img src="${params.row.pp}" alt="avatar" class="avatar" />
                    </div>
                    <div class="alertifyBottom">
                      <div class="alertifyBottomLeft">
                        <div class="alertifyItem">
                          <span class="alertifyKey">Adı Soyadı:</span>
                          <span class="alertifyValue">${params.row.fullName}</span>
                        </div>
                        <div class="alertifyItem">
                          <span class="alertifyKey">Başlangıç Tarihi:</span>
                          <span class="alertifyValue">${params.row.createdAt}</span>
                        </div>
                        <div class="alertifyItem">
                          <span class="alertifyKey">Bitiş Tarihi:</span>
                          <span class="alertifyValue">${params.row.expireDate}</span>
                        </div>
                        <div class="alertifyItem">
                          <span class="alertifyKey">Silah Modeli:</span>
                          <span class="alertifyValue">${params.row.model}</span>
                        </div>
                        <div class="alertifyItem">
                          <span class="alertifyKey">Silah Seri No:</span>
                          <span class="alertifyValue">${params.row.serialNo}</span>
                        </div>
                      </div>
                      <div class="alertifyBottomRight">
                        <div class="alertifyItem">
                          <span class="alertifyKey">Verilme Nedeni:</span>
                          <span class="alertifyValue">${params.row.reason}</span>
                      </div>
                    </div>
                  </div>
                  `,
                    function () {}
                  )
                  .set({
                    transition: "fade",
                    movable: false,
                  });
              }}
            >
              İncele
            </button>
            {user.rankNo >= 8 && (
              <button
                className="userListDelete"
                onClick={() => {
                  deleteLicense(params.row._id).then((res) => {
                    reFetch();
                  });
                }}
              >
                Sil
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const handleAddLicense = async (e) => {
    e.preventDefault();
    const license = {};
    for (let i = 0; i < 5; i++) {
      license[e.target[i].name] = e.target[i].value;
    }
    createLicense(license).then((res) => {
      reFetch();
      setTrigger(false);
    });
  };

  const [trigger, setTrigger] = useState(false);

  return (
    <div className="licenseList">
      <Sidebar />
      <div className="licenseListContainer">
        <Navbar />
        <div className="licenses">
          <AddCircleIcon
            className="addLicense"
            onClick={() => setTrigger(true)}
          />
          <Datatable
            data={licenses}
            columns={columns}
            loading={loading}
            getRowId={(row) => row._id}
          />
          <Popup trigger={trigger} setTrigger={setTrigger}>
            <div className="addLicenseContainer">
              <h3>Lisans Ekle</h3>
              <form className="addLicenseForm" onSubmit={handleAddLicense}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Adı Soyadı"
                  required
                />
                <input
                  type="text"
                  name="serialNo"
                  placeholder="Silah Seri Numarası"
                  required
                />
                <input
                  type="text"
                  name="model"
                  placeholder="Silah Modeli"
                  required
                />
                <input
                  type="text"
                  name="reason"
                  placeholder="Verilme Sebebi"
                  required
                />
                <input
                  type="text"
                  name="pp"
                  placeholder="Kişinin Fotoğraf Linki"
                  required
                />
                <button className="addLicenseButton" type="submit">
                  KAYDET
                </button>
              </form>
              <span>
                *
                <i>
                  Tüm ruhsatlar 1 hafta geçerlidir. Kaydedildiği andan itibaren
                  başlar.
                </i>
              </span>
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default LicenseList;
