import React, { useState } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  let count = users.length;

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
  };

  return (
    <>
      <h2>
        <span>{renderPhrase(count)}</span>
      </h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <React.Fragment key={user._id}>
                <tr>
                  <td>{user.name}</td>
                  <td>
                    {user.qualities.map((item) => (
                      <span
                        className={'badge m-1 bg-' + item.color}
                        key={item._id}
                      >
                        {item.name}
                      </span>
                    ))}
                  </td>
                  <td>{user.profession.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate}/5</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm m-2"
                      onClick={(e) => handleDelete(user._id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
