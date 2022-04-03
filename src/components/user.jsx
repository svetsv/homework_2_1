import React from 'react';
import Qualitie from './qualitie';
import Bookmark from './bookmark';

const User = (props) => {
  return (
    <React.Fragment key={props._id}>
      <tr>
        <td>{props.name}</td>
        <td>
          {props.qualities.map((item) => (
            <Qualitie {...item} />
          ))}
        </td>
        <td>{props.profession.name}</td>
        <td>{props.completedMeetings}</td>
        <td>{props.rate}/5</td>
        <td>
          <Bookmark
            status={props.bookmark}
            idUser={props._id}
            onToggleBookmark={props.onToggleBookmarkUser}
          />
        </td>
        <td>
          <button
            className="btn btn-danger btn-sm m-2"
            onClick={(e) => props.onDeleteUser(props._id)}
          >
            delete
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default User;
