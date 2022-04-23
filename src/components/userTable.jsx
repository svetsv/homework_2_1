import React from "react";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
import PropTypes from "prop-types";

const UserTable = ({
    users,
    selectedSort,
    onSort,
    onDeleteUsers,
    onToggleBookmark
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качество",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onToggleBookmark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => onDeleteUsers(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};
UserTable.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),
    onSort: PropTypes.func,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func,
    onDeleteUsers: PropTypes.func
};

export default UserTable;
