import "./App.css";
import Table from "./utils/table";
import CSVReader from "react-csv-reader";
import { useState } from "react";
import axios from "axios";


function App() {
  const [rows, setRows] = useState([]);
  function createData(fileName, uploadDate, status) {
    return { fileName, uploadDate, status };
  }

  const handleForce = (data, fileInfo) => {
    const obj = { uploadedFilesPk: "44", fileName: fileInfo.name ,status:"success",hospitalCode: 1 };
    axios
      .post("http://127.0.0.1:3002/Files", obj)
      .then((response) => {
        console.log("Status: ", response.status);
        console.log("Data: ", response.data);
      })
      .catch((error) => {
        console.error("Something went wrong!", error);
      });
  

    setRows([
      ...rows,
      createData(fileInfo.name, new Date().toISOString(), "success"),
    ]);
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  const reader = (
    <div className="container">
      <CSVReader
        cssClass="react-csv-input"
        label=""
        onFileLoaded={handleForce}
        parserOptions={papaparseOptions}
      />
    </div>
  );
  return (
    <div className="container-comp">
      <h1>Import Files</h1>
      <div className="buttons">{reader}</div>
      <div>
        <Table rows={rows} />
      </div>
    </div>
  );
}

export default App;
