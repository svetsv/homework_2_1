import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, idUser, onToggleBookmark }) => {
    const classIcon = status ? "bi bi-bookmark-fill" : "bi bi-bookmark";
    return (
        <i className={classIcon} onClick={(e) => onToggleBookmark(idUser)} />
    );
};
Bookmark.propTypes = {
    status: PropTypes.bool.isRequired,
    idUser: PropTypes.string.isRequired,
    onToggleBookmark: PropTypes.func
};
export default Bookmark;
