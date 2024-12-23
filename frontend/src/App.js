import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/homePage/Home";
import ShowList from "./components/lists/ShowLists";
import CreateList from "./components/lists/CreateList";
import EditList from "./components/lists/EditList";
import ListSection from "./components/lists/ListSection";
import ShowDetails from "./components/search/ShowDetails";
import ListAccounts from "./components/accounts/ListAccounts";
import AccountDetails from "./components/accounts/AccountDetails";
import Header from "./components/header/Header";
import CreateAccount from "./components/accounts/CreateAccount";
import CompareList from "./components/compare/CompareList";
import SearchResults from "./components/search/SearchResults";
import AddToList from "./components/lists/AddToList";
import ShowInTheList from "./components/lists/ShowInTheList";
import UpdateAccount from "./components/accounts/UpdateAccount";


function App() {
  return (
    <>
      <Header />
  
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* List Routes */}
        <Route path="/lists" element={<ListSection />} />
        <Route path="/lists/:listId" element={<ShowList />} />
        <Route path="/lists/new" element={<CreateList />} />
        <Route path="/lists/:listId/edit" element={<EditList />} />
        <Route path="/lists/compare" element={<CompareList />} />
        <Route path="/lists/:listId/shows/:showId" element={<ShowInTheList />} />

        {/* Show Details */}
        <Route path="/shows/:showId" element={<ShowDetails />} />

        {/* Account Routes */}
        <Route path="/accounts" element={<ListAccounts />} />
        <Route path="/accounts/:accountId" element={<AccountDetails />} />
        <Route path="/accounts/new" element={<CreateAccount />} />
        <Route path="/accounts/:accountId/edit" element={<UpdateAccount />} />

        <Route path="/lists/:showId/new" element={<AddToList />} />

        <Route path="/search" element={<SearchResults />} />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
