import "./styles.css";
import DatePicker from "../DatePicker";

interface HeaderProps {
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onOperatorNameChange: (name: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onStartDateChange,
  onEndDateChange,
  onOperatorNameChange,
}) => {
  const handleStartDateChange = (date: Date) => {
    onStartDateChange(date);
  };

  const handleEndDateChange = (date: Date) => {
    onEndDateChange(date);
  };

  const handleOperatorNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.value;
    onOperatorNameChange(name);
  };

  return (
    <div className="header-container">
      <header className="header-content">
        <div className="header-content-input">
          <div className="datepicker-content">
            Data início:
            <DatePicker onDateChange={handleStartDateChange} />
            Data fim:
            <DatePicker onDateChange={handleEndDateChange} />
          </div>
          <input
            placeholder="Nome do operador"
            className="operator-input"
            onChange={handleOperatorNameChange}
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
