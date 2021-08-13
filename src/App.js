import "./App.css";
import Table from "./utils/table";
import CSVReader from "react-csv-reader";
import { useState,useEffect,useCallback } from "react";
import axios from "axios";

function App() {

  const [rows, setRows] = useState([]);
  function createData(fileName, uploadDate, status) {
    return { fileName, uploadDate, status };
  }

  // useCallback to prevent change every time
  const getListFiles = useCallback(async () => {
    let response = await fetch('http://127.0.0.1:3002/Files')
    response = await response.json()
    setRows(response)
  }, [])

  useEffect(() => {
    getListFiles()
  }, [getListFiles]);


  // console.log("Status: ", response.status);
  // console.log("Data: ", response.data);
  const handleForce = (data, fileInfo) => {
    const obj = {
      uploadedFilesPk: "44",
      fileName: fileInfo.name,
      status: "success",
      hospitalCode: 1,
    };
    axios
      .post("http://127.0.0.1:3002/Files", obj)
      .then((response) => {
        // file info sent, now send  data itself
        getListFiles();
      })
      .catch((error) => {
        console.error("Something went wrong!", error);
      });

  }
  
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
