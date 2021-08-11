import "./App.css";
import Table from "./utils/table";
import CSVReader from "react-csv-reader";
import { useState } from "react";

function App() {
  
const [rows, setRows ] = useState([]);
  function createData(name, calories, fat) {
    return { name, calories, fat };
  }
  
 
  const handleForce = (data, fileInfo) => {
    console.log("data imported");
 
    setRows([...rows , createData(fileInfo.name , 'sccuess' , 0  )]) ; 
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
