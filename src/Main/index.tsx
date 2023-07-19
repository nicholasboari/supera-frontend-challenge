import { useState } from "react";
import Header from "../Header";
import "./styles.css";
import axios from "axios";

function Main() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [operatorName, setOperatorName] = useState<string>("");

  const handleOperatorNameChange = (name: string) => {
    setOperatorName(name);
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      console.log(startDate);
      console.log(endDate);

      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      if (operatorName) {
        axios
          .get(
            `http://localhost:8080/api/v1/transfers/${operatorName}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
          )
          .then((response) => console.log(response))
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get(
            `http://localhost:8080/api/v1/transfers?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
          )
          .then((response) => console.log(response))
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = (date.getDate() + 1).toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="main-container">
      <Header
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onOperatorNameChange={handleOperatorNameChange}
      />
      <button onClick={handleSearch}>Pesquisar</button>
      <h4>Saldo total: </h4>
      <div className="main-content-table">
        {/* <tr>
          <td>aaa</td>
        </tr> */}
      </div>
    </div>
  );
}

export default Main;
