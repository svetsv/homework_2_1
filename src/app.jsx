import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

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

    return (
        <>
            {users && (
                <Users
                    onDeleteUsers={handleDelete}
                    onToggleBookmark={handleToggleBookmark}
                    users={users}
                />
            )}
        </>
    );
}

export default App;
