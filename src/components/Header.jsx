import PropTypes from "prop-types"; // Import PropTypes
import { PlusCircleIcon } from "@heroicons/react/20/solid";

const Header = ({ openAddEntryModal }) => {
  return (
    <header className="border-dotted border-2 border-sky-500 shadow-black shadow-2xl text-blue-900 flex justify-between items-center p-5 m-2 rounded-2xl mb-10">
      {/* Left side: Heading */}
      <h1 className="text-2xl font-bold">Personal Diary 📔</h1>

      {/* Right side: Add Entry button */}
      <button
        onClick={openAddEntryModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-between"
      >
        <span>Add Entry</span>
        <PlusCircleIcon className="h-5 w-5 ml-2" />
      </button>
    </header>
  );
};

// PropTypes validation
Header.propTypes = {
  openAddEntryModal: PropTypes.func.isRequired, // Validate that openAddEntryModal is a required function
};

export default Header;
