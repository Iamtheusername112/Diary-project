import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import DiaryForm from "./components/DiaryForm";
import DiaryList from "./components/DiaryEntryList";
import DiaryModal from "./components/EntryModal";
import AddEntryModal from "./components/EntryModal";

function App() {
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem("diaryEntries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isAddEntryModalOpen, setIsAddEntryModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = (newEntry) => {
    const existingEntry = entries.find((entry) => entry.date === newEntry.date);
    if (existingEntry) {
      alert("An entry for this date already exists. Please return tomorrow.");
      return;
    }
    setEntries([newEntry, ...entries]);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const openEntryModal = (entry) => {
    setSelectedEntry(entry); // Set the selected entry to open its details in a modal
  };

  const closeEntryModal = () => {
    setSelectedEntry(null); // Close the entry modal
  };

  const openAddEntryModal = () => {
    setIsAddEntryModalOpen(true); // Open the Add Entry modal
  };

  const closeAddEntryModal = () => {
    setIsAddEntryModalOpen(false); // Close the Add Entry modal
  };

  return (
    <div className="app-container p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Personal Diary</h1>
      <button
        onClick={openAddEntryModal}
        className="bg-green-500 text-white px-4 py-2 mb-4 rounded"
      >
        Add Entry
      </button>
      <DiaryList
        entries={entries}
        openEntryModal={openEntryModal}
        deleteEntry={deleteEntry}
      />

      {/* Modal to show entry details */}
      {selectedEntry && (
        <DiaryModal entry={selectedEntry} closeModal={closeEntryModal} />
      )}

      {/* Modal to add a new entry */}
      {isAddEntryModalOpen && (
        <AddEntryModal addEntry={addEntry} closeModal={closeAddEntryModal} />
      )}
    </div>
  );
}

export default App;
