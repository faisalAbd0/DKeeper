import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper_backend as dbank } from "../../../declarations/dkeeper_backend";
import { fetchCandid } from "@dfinity/agent";



function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dbank.createNote(newNote.title, newNote.content);
      return [...prevNotes, newNote];
    });
  }

  useEffect(() => {
    fetchData();

  }, [])

  async function fetchData() {
    const backend_data = await dbank.readNotes();
    setNotes(backend_data.reverse());

  }

  function deleteNote(id) {
    setNotes(prevNotes => {

      // dbank.removeNote(id);
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
