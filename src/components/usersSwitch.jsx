import React from "react";
import UserPage from "./userPage";
import Users from "../layouts/users";
import { useParams } from "react-router-dom";

const UsersSwitch = () => {
    const params = useParams();
    const { userId } = params;

    return <>{userId ? <UserPage id={userId} /> : <Users />}</>;
};
export default UsersSwitch;
