import React from "react";

const Notification = ({ msg, cond }) => {
  const style = cond ? "error" : "notification";
  return <div className={style}>{msg}</div>;
};

export default Notification;
