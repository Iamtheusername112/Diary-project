import { useState } from "react";
import PropTypes from "prop-types";

function AddEntryModal({ addEntry, closeModal }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !image || !content) {
      alert("All fields are required.");
      return;
    }
    const newEntry = {
      id: Date.now(),
      title,
      date,
      image,
      content,
    };
    addEntry(newEntry);
    closeModal();
  };

  return (
    <div className="modal fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add New Entry</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="block w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block w-full p-2 mb-2 border rounded"
          ></textarea>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 bg-gray-300 text-black px-4 py-2 rounded-full flex items-center justify-between"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-between"
            >
              Add Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddEntryModal.propTypes = {
  addEntry: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default AddEntryModal;
