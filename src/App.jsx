import { useState, useEffect } from "react";
import Header from "./components/Header"; // Import Header
import DiaryList from "./components/DiaryList";
import DiaryModal from "./components/DiaryModal";
import AddEntryModal from "./components/AddEntryModal";

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

  const openEntryModal = (entry) => {
    setSelectedEntry(entry);
  };

  const closeEntryModal = () => {
    setSelectedEntry(null);
  };

  const openAddEntryModal = () => {
    setIsAddEntryModalOpen(true);
  };

  const closeAddEntryModal = () => {
    setIsAddEntryModalOpen(false);
  };

  // Function to delete an entry
  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="app-container">
      {/* Include Header component */}
      <Header openAddEntryModal={openAddEntryModal} />

      <div className="p-4 max-w-2xl mx-auto">
        <DiaryList
          entries={entries}
          openEntryModal={openEntryModal}
          deleteEntry={deleteEntry} // Pass deleteEntry function here
        />
        {selectedEntry && (
          <DiaryModal entry={selectedEntry} closeModal={closeEntryModal} />
        )}
        {isAddEntryModalOpen && (
          <AddEntryModal addEntry={addEntry} closeModal={closeAddEntryModal} />
        )}
      </div>
    </div>
  );
}

export default App;
