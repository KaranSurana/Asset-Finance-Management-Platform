import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ApplicationList from './components/ApplicationList';
import CreateApplication from './components/CreateApplication';
import EditApplicationModal from './components/EditApplicationModal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ApplicationList />} />
        <Route path="/applications/create" element={<CreateApplication />} />
        <Route path="/applications/edit/:id" element={<EditApplicationModal />} />
      </Routes>
    </Router>
  );
}

export default App;
