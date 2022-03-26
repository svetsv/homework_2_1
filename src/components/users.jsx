import React, { useState } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [count, setCount] = useState(users.length);

  const renderPhrase = (number) => {
    let classesH1 = 'badge m-2 ';
    let context;
    classesH1 += number === 0 ? 'bg-danger' : 'bg-primary';
    switch (number) {
      case 2:
      case 3:
      case 4:
        context = `${number} человека тусанет с тобой сегодня`;
        break;
      case 0:
        context = 'Никто с тобой не тусанет';
        break;
      default:
        context = `${number} человек тусанет с тобой сегодня`;
    }
    return <span className={classesH1}>{context}</span>;
  };

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    setCount((prevState) => prevState - 1);
  };

  const renderHeaderTable = () => {
    return (
      <>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
        </tr>
      </>
    );
  };

  const renderQualities = (user) => {
    return user.qualities.map((it) => {
      let classes = `badge m-2 bg-${it.color}`;
      return (
        <span key={it._id} className={classes}>
          {it.name}
        </span>
      );
    });
  };
  const renderUser = () => {
    return (
      users.length !== 0 &&
      users.map((user, index) => (
        <React.Fragment key={user._id}>
          <tr>
            <td>{user.name}</td>
            <td>{renderQualities(user)}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
              <button
                key={user._id}
                className="btn btn-danger btn-sm m-2"
                onClick={(e) => handleDelete(user._id)}
              >
                delete
              </button>
            </td>
          </tr>
        </React.Fragment>
      ))
    );
  };

  return (
    <>
      <h1>{renderPhrase(count)}</h1>
      <table className="table">
        <thead>{renderHeaderTable()}</thead>
        <tbody>{renderUser()}</tbody>
      </table>
    </>
  );
};

export default Users;
