import PropTypes from "prop-types";

function DiaryModal({ entry, closeModal }) {
  return (
    <div className="modal fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow max-w-md w-full relative">
        {/* Close Button Inside the Modal */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 bg-gray-300 text-black px-4 py-2 rounded-full flex items-center justify-between"
        >
          <span>Close</span>
        </button>

        <h2 className="text-xl font-bold mb-4">{entry.title}</h2>
        <p className="text-sm text-gray-600">{entry.date}</p>
        <img
          src={entry.image}
          alt="Entry Image"
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <p className="text-base">{entry.content}</p>
      </div>
    </div>
  );
}

DiaryModal.propTypes = {
  entry: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default DiaryModal;
