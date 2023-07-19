import { useEffect, useState } from "react";
import { Transfer } from "../../model/transfer";
import { ApiResponse } from "../../model/api";
import { formatDate } from "../../util/formatDate";
import Header from "../Header";
import axios from "axios";
import "./styles.css";

const API_BASE_URL = "http://localhost:8080/api/v1";

function Main() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [operatorName, setOperatorName] = useState<string>("");
  const [transfer, setTransfer] = useState<Transfer[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);

  // capturando o valor do input Operator Name e setando
  const handleOperatorNameChange = (name: string) => {
    setOperatorName(name);
  };

  // calcula o Saldo total das transferências
  const calculateTotalSum = (transferData: Transfer[]) => {
    const total = transferData.reduce(
      (accumulator, item) => accumulator + item.value,
      0
    );
    setTotalSum(total);
  };

  // realiza a busca das transferências com base nos filtros
  const performSearch = () => {
    let apiUrl = `${API_BASE_URL}/transfers/all`;

    if (operatorName) {
      apiUrl = `${API_BASE_URL}/transfers/find?operatorName=${operatorName}`;
    } else if (startDate && endDate) {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      apiUrl = `${API_BASE_URL}/transfers?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    }

    axios
      .get<ApiResponse>(apiUrl)
      .then((response) => {
        setTransfer(response.data.content);
        calculateTotalSum(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // renderiza os dados assim que a página inicia
  useEffect(() => {
    performSearch();
  }, [operatorName, startDate, endDate]);

  return (
    <div className="main-container">
      <Header
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onOperatorNameChange={handleOperatorNameChange}
      />
      <button onClick={performSearch}>Pesquisar</button>
      <h4>Saldo total: {totalSum.toFixed(2)}</h4>
      <div className="main-content-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Nome do Operador</th>
            </tr>
          </thead>
          <tbody>
            {transfer.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>{item.value}</td>
                <td>{item.type}</td>
                <td>{item.operatorName || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Main;
