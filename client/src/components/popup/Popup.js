import "./Popup.scss";

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <button className="close-btn" onClick={() => props.setTrigger(false)}>
        Kapat
      </button>
      <div className="popup-inner">{props.children}</div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
