import { useState, useEffect } from "react";
import DiaryList from "./components/DiaryList";
import DiaryModal from "./components/DiaryModal";
import AddEntryModal from "./components/AddEntryModal";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

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
    setSelectedEntry(entry); // Open the DiaryModal and pass the entry
  };

  const closeEntryModal = () => {
    setSelectedEntry(null); // Close the DiaryModal
  };

  const openAddEntryModal = () => {
    setIsAddEntryModalOpen(true); // Open the AddEntryModal
  };

  const closeAddEntryModal = () => {
    setIsAddEntryModalOpen(false); // Close the AddEntryModal
  };

  return (
    <div className="app-container p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Personal Diary</h1>
      {/* <Header /> */}
      <button
        onClick={openAddEntryModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-between"
      >
        <span>Add Entry</span>
        <PlusCircleIcon className="h-5 w-5 ml-2" />
      </button>
      <DiaryList
        entries={entries}
        openEntryModal={openEntryModal}
        deleteEntry={deleteEntry}
      />
      {selectedEntry && (
        <DiaryModal entry={selectedEntry} closeModal={closeEntryModal} />
      )}
      {isAddEntryModalOpen && (
        <AddEntryModal addEntry={addEntry} closeModal={closeAddEntryModal} />
      )}
    </div>
  );
}

export default App;
