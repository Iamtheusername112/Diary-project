// src/components/Header.jsx
import PropTypes from "prop-types";

const Header = ({ onAddEntry }) => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Personal Diary</h1>
      <button
        className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
        onClick={onAddEntry}
      >
        Add Entry
      </button>
    </header>
  );
};

// Define propTypes for validation
Header.propTypes = {
  onAddEntry: PropTypes.func.isRequired,
};

export default Header;
