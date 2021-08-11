import "./App.css";
import Table from "./utils/table"; 
import CSVReader from "react-csv-reader";

function App() {
  
const handleForce = (data, fileInfo) => console.log(data, fileInfo);

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
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
      <div className="buttons">
       
        {reader}
       
      </div>
      <div>
        <Table/>
      </div>
  
    </div>
  );
}

export default App;
