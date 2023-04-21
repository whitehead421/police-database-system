import "./report.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { WithContext as ReactTags } from "react-tag-input";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { createReport } from "../../helpers/apiCalls";

const Report = () => {
  const { user } = useContext(AuthContext);
  const { data: officers } = useFetch("/api/officers/");
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const [tags, setTags] = useState([]);
  const [links, setLinks] = useState([]);
  const [type, setType] = useState("olay");

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  const handleDeleteLink = (i) => {
    setLinks(links.filter((link, index) => index !== i));
  };

  const handleAdditionLink = (link) => {
    setLinks([...links, link]);
  };

  const handleDragLink = (link, currPos, newPos) => {
    const newLinks = links.slice();

    newLinks.splice(currPos, 1);
    newLinks.splice(newPos, 0, link);

    setLinks(newLinks);
  };

  const officerSuggestions = () => {
    const suggestions = [];
    officers.map((officer) => {
      if (officer.name !== user.name) {
        suggestions.push({
          id: officer._id,
          text: officer.name + " " + officer.surname,
        });
      }
      return null;
    });
    return suggestions;
  };

  const today = new Date();

  const [raporTitle, setRaporTitle] = useState("");
  const [raporDesc, setRaporDesc] = useState("");

  useEffect(() => {
    const img = document.getElementsByClassName("evidenceImage");
    if (!img) {
      console.log("there is no img");
    } else {
      for (let i = 0; i < img.length; i++) {
        img[i].addEventListener("error", function handleError() {
          img[i].src = "https://i.hizliresim.com/sxio1b3.png";
          img[i].removeEventListener("error", handleError);
        });
      }
    }
  }, [links]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const report = {};
    for (let i = 0; i < 5; i++) {
      report[e.target[i].name] = e.target[i].value;
    }

    let moreOfficers = tags.map((o) => o.text);
    let photos = links.map((l) => l.text);

    report.moreOfficers = moreOfficers;
    report.photos = photos;
    report.officer = user.name + " " + user.surname;

    console.log(report);
    createReport(report);
  };

  const handleReportType = (e) => {
    setType(e.target.value);
  };

  const titlesInput = {
    ia: "Soruşturma Açılan Kişi",
    fts: "FTS İsmi",
    olay: "Başlık",
  };

  return (
    <div className="report">
      <Sidebar />
      <div className="reportContainer">
        <Navbar />
        <div className="pageWrapper">
          <div className="item">
            <form onSubmit={handleSubmit}>
              <div className="formItem">
                <div className="itemTitle">{titlesInput[type]}</div>
                <input
                  type="text"
                  placeholder={titlesInput[type]}
                  className="rprInput"
                  name="title"
                  onChange={(e) => setRaporTitle(e.target.value)}
                />
              </div>
              <div className="formItem">
                <div className="itemTitle">Rapor Açıklaması</div>
                <textarea
                  type="text"
                  placeholder="Rapor Açıklaması"
                  name="report"
                  onChange={(e) => setRaporDesc(e.target.value)}
                />
              </div>
              <div className="formItem">
                <div className="itemTitle">Rapor Türü</div>
                <select name="type" onChange={handleReportType}>
                  <option value="olay">Olay Raporu</option>
                  <option value="ia">Internal Affairs Raporu</option>
                  <option disabled={!user.isFTO} value="fts">
                    FTS Raporu
                  </option>
                </select>
              </div>
              {type !== "fts" ? (
                <div className="formItem">
                  <ReactTags
                    tags={tags}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    delimiters={delimiters}
                    suggestions={officerSuggestions()}
                    placeholder="Olaydaki Memurlar"
                  />
                </div>
              ) : null}
              <div className="formItem">
                <div className="linkTags">
                  {links.map((link, i) => (
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        marginRight: "5px",
                        cursor: "pointer",
                        objectFit: "contain",
                      }}
                      onClick={() => {
                        setLinks(links.filter((link, index) => index !== i));
                      }}
                      className="evidenceImage"
                      src={link.text}
                      key={i}
                      alt=""
                    />
                  ))}
                  <ReactTags
                    tags={links}
                    handleDelete={handleDeleteLink}
                    handleAddition={handleAdditionLink}
                    handleDrag={handleDragLink}
                    delimiters={delimiters}
                    placeholder="Sadece fotoğraf linki eklenebilir"
                  />
                </div>
              </div>
              <div className="formItem">
                <button className="rprBtn" type="submit">
                  Raporu Oluştur
                </button>
              </div>
            </form>
          </div>
          <div className="item">
            <img
              src="https://i.hizliresim.com/hmttz34.png"
              className="backgroundLogo"
              alt="previewBackground"
            />
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
                {type === "ia" ? (
                  <span
                    style={{
                      fontWeight: "300",
                      fontSize: "16px",
                      letterSpacing: "1px",
                    }}
                  >
                    HIGH COMMAND OFFICE
                  </span>
                ) : null}
                {type === "fts" ? (
                  <span
                    style={{
                      fontWeight: "300",
                      fontSize: "16px",
                      letterSpacing: "1px",
                    }}
                  >
                    FIELD TRAINING PROGRAM
                  </span>
                ) : null}
              </div>
              <div className="previewContent">
                <div className="previewDate">
                  <b>Tarih:</b>{" "}
                  {today.getDate() +
                    "." +
                    today.getMonth() +
                    "." +
                    today.getFullYear()}
                </div>
                <div className="previewTitle">
                  {type === "ia" ? <b>Soruşturma Açılan Kişi: </b> : null}
                  {type === "fts" ? <b>Hakkında rapor tutulan kişi: </b> : null}
                  {type !== "fts" ? type !== "ia" && <b>Başlık: </b> : null}
                  {raporTitle}
                </div>
                <div className="previewDesc">
                  <b>Detaylar:</b> {raporDesc}
                </div>
                {type !== "fts" ? (
                  <div className="previewTags">
                    <b>Olayda Bulunan Memurlar: </b>
                    {tags.map((tag, index) => (
                      <span className="tag">
                        {tag.text}
                        {index !== tags.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="previewFooter">
                <div className="wrapper">
                  <div className="previewNam">
                    {user.name} {user.surname}
                  </div>
                  <div className="previewSign">
                    {user?.name[0] + ". " + user?.surname}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
