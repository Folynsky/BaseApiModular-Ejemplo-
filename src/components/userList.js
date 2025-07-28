// src/components/UserList.js
import React from 'react';

function UserList({ users }) {
  return (
    <div className="user-list">
      <h2>Lista de Usuarios</h2>
      {users.length > 0 ? (
     
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron usuarios.</p>
      )}
    </div>
  );
}

export default UserList;