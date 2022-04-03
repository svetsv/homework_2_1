import React from 'react';

const Bookmark = (props) => {
  let classIcon = props.status ? 'bi bi-bookmark-fill' : 'bi bi-bookmark';
  return (
    <i
      key={props.idUser}
      className={classIcon}
      onClick={(e) => props.onToggleBookmark(props.idUser)}
    />
  );
};

export default Bookmark;
