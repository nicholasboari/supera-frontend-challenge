import "./styles.css";
import DatePicker from "../DatePicker";

function Header() {
  const handleDateChange = (date: Date) => {
    const formattedDate = formatDate(date);
    console.log(formattedDate);
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = (date.getDate() + 1).toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="header-container">
      <header className="header-content">
        <div className="header-content-input">
          <div className="datepicker-content">
            Data inicio
            <DatePicker onDateChange={handleDateChange} />
            Data fim
            <DatePicker onDateChange={handleDateChange} />
          </div>
          <input placeholder="Nome do operador" className="operator-input" />
        </div>
        <button>Pesquisar</button>
      </header>
    </div>
  );
}

export default Header;
