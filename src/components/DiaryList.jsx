import { TrashIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
import { useState } from "react";

function DiaryList({ entries, openEntryModal, deleteEntry }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null); // Store the entry to be deleted

  const openDeleteModal = (entry) => {
    setEntryToDelete(entry); // Set the entry to be deleted
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); // Close the delete confirmation modal
    setEntryToDelete(null); // Reset the entry to be deleted
  };

  const handleDelete = () => {
    if (entryToDelete) {
      deleteEntry(entryToDelete.id); // Call delete function with the selected entry
      closeDeleteModal(); // Close the delete confirmation modal after deletion
    }
  };

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const openDiaryModal = (entry) => {
    // Open DiaryModal only when the delete modal is not open
    if (!isDeleteModalOpen) {
      openEntryModal(entry); // Call the function passed as a prop to open DiaryModal
    }
  };

  return (
    <div className="diary-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedEntries.length === 0 ? (
        <p className="text-center col-span-full">No diary entries yet.</p>
      ) : (
        sortedEntries.map((entry) => (
          <div
            key={entry.id}
            className="entry bg-gray-100 p-4 mb-2  rounded  shadow-lg cursor-pointer"
            onClick={() => openDiaryModal(entry)} // Open Diary Modal when card is clicked
          >
            <img
              src={entry.image}
              alt="Preview"
              className="w-full h-40 object-cover mb-7 rounded"
            />
            <h2 className="text-lg font-bold">{entry.title}</h2>
            <p className="text-sm text-gray-600">{entry.date}</p>

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent opening DiaryModal when delete button is clicked
                openDeleteModal(entry); // Open delete confirmation modal
              }}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full flex items-center justify-between"
            >
              <span>Delete</span>
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to delete this entry?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={closeDeleteModal} // Close delete modal without deleting
                className="bg-gray-300 text-black px-4 py-2 rounded-full flex items-center justify-between"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete} // Perform the delete action
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full flex items-center justify-between"
              >
                <span>Delete</span>
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
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
  openEntryModal: PropTypes.func.isRequired, // This function opens DiaryModal
  deleteEntry: PropTypes.func.isRequired, // This function deletes an entry
};

export default DiaryList;
