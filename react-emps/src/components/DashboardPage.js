import React from "react";

const DashboardPage = ({
  uploadXLS,
  closeSocket,
  empFileUpPercent,
  apiData,
}) => {
  return (
    <div>
      <button className="btn btn-primary btn-lg" onClick={uploadXLS}>
        Open Socket - Upload XLS Data
      </button>
      <button className="btn btn-primary btn-lg" onClick={closeSocket}>
        Close Socket - Stop XLS Upload
      </button>
      <br />
      <br />
      <span>
        Upload %....<span className="clsStatus">{empFileUpPercent}</span>
      </span>
      <br />
      <br />
      <span>
        File Upload ( apiData ) ....
        <span className="clsStatus">{apiData}</span>
      </span>
    </div>
  );
};

export default DashboardPage;
