import "./App.css";
import Table from "./utils/table";
import CSVReader from "react-csv-reader";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function App() {
  const [rows, setRows] = useState([]);

  // useCallback to prevent get files every  render
  const getListFiles = useCallback(async () => {
    let response = await fetch("http://127.0.0.1:3002/Files");
    response = await response.json();
    setRows(response);
  }, []);

  useEffect(() => {
    getListFiles();
  }, [getListFiles]);

  const handleForce = (data, fileInfo) => {
     console.log(data) ; 

    const obj = {
      fileName: fileInfo.name,
      status: "success",
      hospitalCode: 1,
    };
    console.log(data);
    axios
      .post("http://127.0.0.1:3002/rawdata", data)
      .then((response) => {
        // data sent
        axios
          .post("http://127.0.0.1:3002/Files", obj)
          .then((response) => {
            // file info sent

          getListFiles();
          })
          .catch((error) => {
            console.error("Something went wrong!", error);
          });
      //  getListFiles();
      })
      .catch((error) => {
        console.error("Something went wrong!", error);
      });
  };

  const options = {
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
        parserOptions={options}
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
