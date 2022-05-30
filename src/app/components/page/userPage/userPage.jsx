import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import UserCard from "../../ui/userCard";
import QualityCard from "../../ui/qualityCard";
import MeetingCard from "../../ui/meetingCard";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualityCard data={user.qualities} />
                        <MeetingCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <span>Loading</span>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
