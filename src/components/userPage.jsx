import React, { useState, useEffect } from "react";
import api from "../api";
import PropTypes from "prop-types";
import QualitieList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    const history = useHistory();
    const handleAllUsers = () => {
        history.push("/users");
    };
    return user
        ? (
            <>
                <h1>{user.name}</h1>
                <QualitieList qualities={user.qualities} />
                <div>Профессия - {user.profession.name}</div>
                <div>Рейтинг - {user.rate}</div>
                <div>Количество встреч -{user.completedMeetings}</div>
                <button
                    className="btn btn-primary btn-sm m-2"
                    onClick={() => handleAllUsers()}
                >
                Все пользователи
                </button>
            </>
        )
        : (
            "Loading...."
        );
};
UserPage.propTypes = {
    id: PropTypes.string
};
export default UserPage;
