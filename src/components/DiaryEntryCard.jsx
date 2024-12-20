// src/components/DiaryCard.js
import PropTypes from "prop-types";

const DiaryCard = ({ entry, onClick }) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md m-4 cursor-pointer"
      onClick={() => onClick(entry)}
    >
      <img
        src={entry.image}
        alt={entry.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-semibold mt-2">{entry.title}</h2>
      <p className="text-gray-500">
        {new Date(entry.date).toLocaleDateString()}
      </p>
    </div>
  );
};

DiaryCard.propTypes = {
  entry: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired, // Assuming dates are stored as strings
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DiaryCard;
