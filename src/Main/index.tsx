import { useEffect, useState } from "react";
import { Transfer } from "../model/transfer";
import { ApiResponse } from "../model/api";
import Header from "../Header";
import axios from "axios";
import "./styles.css";

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

  // calcula o Saldo total das transferencias
  const calculateTotalSum = (transferData: Transfer[]) => {
    const total = transferData.reduce(
      (accumulator, item) => accumulator + item.value,
      0
    );
    setTotalSum(total);
  };

  // renderiza os dados
  useEffect(() => {
    axios
      .get<ApiResponse>(`http://localhost:8080/api/v1/transfers/all`)
      .then((response) => {
        setTransfer(response.data.content);
        calculateTotalSum(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = () => {
    if (startDate && endDate) {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      if (operatorName) {
        axios
          .get<ApiResponse>(
            `http://localhost:8080/api/v1/transfers/${operatorName}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
          )
          .then((response) => {
            setTransfer(response.data.content);
            calculateTotalSum(response.data.content);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get<ApiResponse>(
            `http://localhost:8080/api/v1/transfers?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
          )
          .then((response) => {
            setTransfer(response.data.content);
            calculateTotalSum(response.data.content);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  // formantando data
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
