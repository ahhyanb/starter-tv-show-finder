import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import ShowList from "./components/Lists/ShowLists"
import CreateList from "./components/Lists/CreateList";
import EditList from "./components/Lists/EditList";
import ListSection from "./components/Lists/ListSection";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lists" element={<ListSection />} />
        <Route path="/lists/:listId" element={<ShowList />} />
        <Route path="/lists/new" element={<CreateList />} />
        <Route path="/lists/:listId/edit" element={<EditList />} />

        {/* <Route path="/shows" element={<ShowsSearch />} /> */}

      </Routes>
    </>
  );
}

export default App;
