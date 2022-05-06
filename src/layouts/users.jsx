import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import api from "../api";
import Pagination from "../components/pagination";
import GroupList from "../components/groupList";
import SearchStatus from "../components/searchStatus";
import UserTable from "../components/userTable";
import PropTypes from "prop-types";
import _ from "lodash";

const Users = () => {
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [dataSearchUser, setDataSearchUser] = useState("");
    const pageSize = 8;

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        setCurrentPage(1);
    }, [dataSearchUser]);

    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };
    const handleToggleBookmark = (id) => {
        const usersCopy = [...users];
        const index = usersCopy.findIndex((it) => it._id === id);
        usersCopy[index].bookmark = !usersCopy[index].bookmark;
        setUsers(usersCopy);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleItemSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSearchUser = ({ target }) => {
        setDataSearchUser(() => target.value.toLowerCase());
    };
    /* eslint-disable */
    if (users) {
        const filterUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;

        const filterUsersSearch = dataSearchUser
            ? filterUsers.filter((user) =>
                  user.name.toLowerCase().includes(dataSearchUser)
              )
            : filterUsers;

        const count = filterUsersSearch.length;
        const sortedUsers = _.orderBy(
            filterUsersSearch,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };
        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleItemSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="searchUser"
                            placeholder="search...."
                            value={dataSearchUser}
                            onChange={handleSearchUser}
                        />
                    </div>

                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            selectedSort={sortBy}
                            onSort={handleSort}
                            onDeleteUsers={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};
Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};
export default Users;
