// src/App.js
import React, { useEffect, useState } from 'react';
import UserForm from './components/userForm';
import UserList from './components/userList';
import userService from './services/userService'; // Importa tu servicio
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creationMessage, setCreationMessage] = useState('');

  // Función para cargar usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAllUsers(); // Usa el servicio
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para manejar la creación de un nuevo usuario desde el formulario
  const handleCreateUser = async (userName) => {
    setCreationMessage('');
    if (!userName.trim()) {
      setCreationMessage('El nombre de usuario no puede estar vacío.');
      return;
    }

    try {
      const savedUser = await userService.createUser(userName); // Usa el servicio
      setCreationMessage(`Usuario "${savedUser.name}" (ID: ${savedUser.id}) creado exitosamente.`);
      fetchUsers(); // Recarga la lista para mostrar el nuevo usuario
    } catch (err) {
      setCreationMessage(`Error al crear usuario: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) {
    return <div className="loading-message">Cargando usuarios...</div>;
  }

  if (error) {
    return <div className="error-message">Error al cargar usuarios: {error}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Administración de Usuarios</h1>

        {/* Pasa la función de creación y el mensaje al UserForm */}
        <UserForm onCreateUser={handleCreateUser} creationMessage={creationMessage} />

        {/* Pasa la lista de usuarios al UserList */}
        <UserList users={users} />
      </header>
    </div>
  );
}

export default App;