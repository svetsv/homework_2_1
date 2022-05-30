import React, { useEffect, useState } from "react";
import api from "../../api";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";
import CommentsList, { AddCommentForm } from "../common/comments";
import PropTypes from "prop-types";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };
    const handleRemoveComment = (id) => {
        api.comments
            .remove(id)
            .then((id) => setComments(comments.filter((it) => it._id !== id)));
    };
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
Comments.propTypes = {
    length: PropTypes.number
};

export default Comments;
