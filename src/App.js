import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Asegúrate de que este archivo exista para estilos básicos

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newUserName, setNewUserName] = useState(''); // Estado para el nombre del nuevo usuario
  const [creationMessage, setCreationMessage] = useState(''); // Mensaje de éxito/error al crear

  // Función para cargar usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true); // Vuelve a true para mostrar "Cargando" al recargar
      setError(null);    // Limpia errores anteriores
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Carga usuarios al montar el componente
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // Función para manejar la creación de un nuevo usuario
  const handleCreateUser = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
    setCreationMessage(''); // Limpia mensajes anteriores

    if (!newUserName.trim()) {
      setCreationMessage('El nombre de usuario no puede estar vacío.');
      return;
    }

    try {
      // Envía una solicitud POST a tu API
      const response = await axios.post('http://localhost:8080/api/users', {
        name: newUserName // El cuerpo de la solicitud, debe coincidir con el objeto User en Spring
      });

      // Si la creación es exitosa (código 201 Created), actualiza la lista de usuarios
      setCreationMessage(`Usuario "${response.data.name}" (ID: ${response.data.id}) creado exitosamente.`);
      setNewUserName(''); // Limpia el campo del formulario
      fetchUsers(); // Vuelve a cargar la lista de usuarios para incluir el nuevo
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

        {/* Formulario para crear un nuevo usuario */}
        <div className="user-form">
          <h2>Crear Nuevo Usuario</h2>
          <form onSubmit={handleCreateUser}>
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

        {/* Lista de usuarios existente */}
        <div className="user-list">
          <h2>Lista de Usuarios</h2>
          {users.length > 0 ? (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  ID: {user.id}, Nombre: {user.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron usuarios.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;