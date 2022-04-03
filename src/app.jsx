import React, { useState } from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from './api';

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleToggleBookmark = (id) => {
    const usersCopy = [...users];
    const index = usersCopy.findIndex((it) => it._id === id);
    usersCopy[index].bookmark = !usersCopy[index].bookmark;
    setUsers(usersCopy);
  };

  return (
    <>
      <h2>
        <span>
          <SearchStatus length={users.length} />
        </span>
      </h2>
      {users.length > 0 && (
        <Users
          onDeleteUsers={handleDelete}
          onToggleBookmark={handleToggleBookmark}
          value={users}
        />
      )}
    </>
  );
}

export default App;
