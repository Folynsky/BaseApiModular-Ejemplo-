// src/components/UserForm.js
import React, { useState } from 'react';

function UserForm({ onCreateUser, creationMessage }) {
  const [newUserName, setNewUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newUserName.trim()) {
  
      return;
    }
    onCreateUser(newUserName); 
    setNewUserName(''); 
  };

  return (
    <div className="user-form">
      <h2>Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del usuario"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          required
        />
        <button type="submit">Crear Usuario</button>
      </form>
      {creationMessage && <p className="creation-message">{creationMessage}</p>}
    </div>
  );
}

export default UserForm;