import "./internal.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import useFetch from "../../hooks/useFetch";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { useMemo, useState } from "react";
import { useEffect } from "react";

const Internal = () => {
  const [preview, setPreview] = useState(null);
  const [search, setSearch] = useState("");
  const { data: reports } = useFetch("/api/reports/type/ia");

  useEffect(() => {
    if (reports) {
      setPreview(reports[0]);
    }
  }, [reports]);

  const filteredReports = useMemo(() => {
    if (search) {
      return reports.filter(
        (item) =>
          item.title.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1
      );
    }
    return reports;
  }, [search, reports]);

  return (
    <div className="internal">
      <Sidebar />
      <div className="internalContainer">
        <Navbar />
        <div className="internalFiles">
          <div className="fileListContainer">
            <div className="fileSearch">
              <input
                type="text"
                placeholder="Dosya ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <ul>
              {filteredReports.length > 0 ? (
                filteredReports &&
                filteredReports.map((report, index) => (
                  <li key={index} onClick={() => setPreview(report)}>
                    <div className="fileListName" key={index}>
                      {preview?._id === report?._id ? (
                        <FolderOpenIcon className="fileIcon" />
                      ) : (
                        <FolderSharedIcon className="fileIcon" />
                      )}
                      <span className="officerName">{report.title}</span>
                    </div>
                    <span className="fileListDate">{report.createdAt}</span>
                  </li>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                  }}
                >
                  <ContentPasteSearchIcon
                    style={{ fontSize: "40px", marginRight: "10px" }}
                  />
                  Eşleşen sonuç bulunamadı.
                </div>
              )}
            </ul>
          </div>
          <div className="internalFile">
            <img
              src="https://i.hizliresim.com/hmttz34.png"
              className="backgroundLogo"
              alt="previewBackground"
            />
            {preview && (
              <div className="preview">
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
                  <span
                    style={{
                      fontWeight: "300",
                      fontSize: "16px",
                      letterSpacing: "1px",
                    }}
                  >
                    HIGH COMMAND OFFICE
                  </span>
                </div>
                <div className="previewContent">
                  <div className="previewDate">
                    <b>Tarih:</b> {preview.createdAt}
                  </div>
                  <div className="previewTitle">
                    {preview?.type !== "ia" ? (
                      <b>Başlık:</b>
                    ) : (
                      <b>Soruşturma Açılan Kişi: </b>
                    )}
                    {preview?.title}
                  </div>
                  <div className="previewDesc">
                    <b>Detaylar:</b> {preview?.report}
                  </div>
                  <div className="previewTags">
                    <b>Olayda Bulunan Memurlar: </b>
                    {preview?.moreOfficers.map((officer, index) => (
                      <span className="tag" key={index}>
                        {officer}
                        {index !== preview?.moreOfficers.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                  <div className="previewPhotos">
                    <b>Fotoğraflar: </b>
                    {preview?.photos.map((photo, index) => (
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
                    <div>{preview?.officer}</div>
                    <div className="previewSign">
                      {preview?.officer[0]}. {preview?.officer.split(" ")[1]}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Internal;
