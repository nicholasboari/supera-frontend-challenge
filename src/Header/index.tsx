import "./index.css";
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
      <header>
        <DatePicker onDateChange={handleDateChange} />
        <DatePicker onDateChange={handleDateChange} />
      </header>
    </div>
  );
}

export default Header;
