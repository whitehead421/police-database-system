import "./widget.scss";

const Widget = ({ announcement, isAnnon }) => {
  return (
    <div className="widget">
      <div className="title">{announcement.title}</div>
      <div className="content">{announcement.duyuru}</div>
      {!isAnnon && <div className="link">Duyuruyu gör</div>}
    </div>
  );
};

export default Widget;
