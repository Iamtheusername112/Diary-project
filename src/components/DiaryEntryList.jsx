import PropTypes from "prop-types";

function DiaryList({ entries, openEntryModal, deleteEntry }) {
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="diary-list">
      {sortedEntries.length === 0 ? (
        <p className="text-center">No diary entries yet.</p>
      ) : (
        sortedEntries.map((entry) => (
          <div
            key={entry.id}
            className="entry bg-gray-100 p-4 mb-2 rounded shadow cursor-pointer"
            onClick={() => openEntryModal(entry)} // Open the entry details modal
          >
            <img
              src={entry.image}
              alt="Preview"
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-bold">{entry.title}</h2>
            <p className="text-sm text-gray-600">{entry.date}</p>
            {/* Add a delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent the modal from opening when delete is clicked
                deleteEntry(entry.id); // Call deleteEntry when button is clicked
              }}
              className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

DiaryList.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  openEntryModal: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired,
};

export default DiaryList;
