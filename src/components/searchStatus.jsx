import React from 'react';

const SearchStatus = ({ length }) => {
  let classesH1 = 'badge m-2 ';
  let context;
  const lastOne = Number(length.toString().slice(-1));
  classesH1 += length === 0 ? 'bg-danger' : 'bg-primary';
  switch (lastOne) {
    case 2:
    case 3:
    case 4:
      context = `${length} человека тусанет с тобой сегодня`;
      break;
    case 0:
      context = 'Никто с тобой не тусанет';
      break;
    default:
      context = `${length} человек тусанет с тобой сегодня`;
  }
  return <span className={classesH1}>{context}</span>;
};

export default SearchStatus;
