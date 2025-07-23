import React, { useEffect, useState } from 'react';
import './App.css'; // Si usas el CSS predeterminado o lo eliminas si no lo necesitas

function App() {
  const [users, setUsers] = useState([]); // Estado para guardar los usuarios
  const [error, setError] = useState(null); // Estado para manejar errores
  const [loading, setLoading] = useState(true); // Estado para indicar si está cargando

  useEffect(() => {
    // La función que hará la llamada a la API
    const fetchUsers = async () => {
      try {
        // Asegúrate de que tu API de Spring Boot esté corriendo en http://localhost:8080
        const response = await fetch('http://localhost:8080/api/users');

        // Verifica si la respuesta fue exitosa (código 2xx)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parsea la respuesta JSON
        setUsers(data); // Actualiza el estado con los usuarios
      } catch (err) {
        setError(err.message); // Captura y guarda cualquier error
      } finally {
        setLoading(false); // Deja de mostrar el indicador de carga
      }
    };

    fetchUsers(); // Llama a la función al montar el componente
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de Usuarios de la API</h1>
        {users.length > 0 ? (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                ID: {user.id}, Nombre: {user.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron usuarios.</p>
        )}
      </header>
    </div>
  );
}

export default App;