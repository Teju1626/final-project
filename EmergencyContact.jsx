import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmergencyContact.css';

const EmergencyContact = () => {
  const [contact, setContact] = useState({ name: '', phone: '', relation: '' });
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact({ ...contact, [name]: value });
  };

  const handleAddContact = () => {
    // Validate input fields
    if (!contact.name || !contact.phone || !contact.relation) {
      alert('Please fill out all fields.');
      return;
    }

    // Add the contact to the contacts list
    setContacts([...contacts, contact]);
    // Reset contact form
    setContact({ name: '', phone: '', relation: '' });
  };

  const handleSave = (event) => {
    event.preventDefault();

    // Check if there are any contacts to save
    if (contacts.length === 0) {
      alert('Please add at least one contact.');
      return;
    }

    // Log the saved contacts to the console (for debugging)
    console.log('Saved Contacts:', contacts);

    // Navigate to the emergency page and pass the contacts state
    navigate('/emergency', { state: { contacts } });
  };

  return (
    <div className="page-wrapper">
      <img src="./safesteps.jpg" alt="Logo" className="logo" />
      <h1 className="app-heading">Safe Steps</h1>
      <div className="contact-container">
        <h2>Emergency Contacts</h2>
        <p>Add your emergency contacts below:</p>
        <form className="contact-form" onSubmit={handleSave}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={contact.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={contact.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="relation"
              placeholder="Relation"
              value={contact.relation}
              onChange={handleChange}
              required
            />
          </div>
          <button 
            type="button" 
            onClick={handleAddContact} 
            className="add-contact-button"
          >
            Add Another Contact
          </button>
          <button type="submit" className="save-button">Save</button>
        </form>
        
        {/* Display added contacts for user reference */}
        <div className="added-contacts">
          <h3>Added Contacts:</h3>
          <ul>
            {contacts.map((contact, index) => (
              <li key={index}>
                {contact.name} - {contact.phone} ({contact.relation})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
