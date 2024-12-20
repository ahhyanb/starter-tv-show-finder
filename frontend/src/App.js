import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import ShowList from "./components/Lists/ShowLists"
import CreateList from "./components/Lists/CreateList";
import EditList from "./components/Lists/EditList";
import ListSection from "./components/Lists/ListSection";
import ShowDetails from "./components/ShowDetails/ShowDetails";
import ListAccounts from "./components/accounts/ListAccounts";
import AccountDetails from "./components/accounts/AccountDetails";
import Header from "./components/Header/Header";
import CreateAccount from "./components/accounts/CreateAccount";
import CompareList from "./components/Compare/CompareList";

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
        <Route path="/shows/:showId" element={<ShowDetails />} />

        <Route path="/accounts" element={<ListAccounts />} />
        <Route path="/accounts/:accountId" element={<AccountDetails />} />
        <Route path="/accounts/new" element={<CreateAccount />} />

        <Route path="lists/compare" element={<CompareList />} />

      </Routes>
    </>
  );
}

export default App;
