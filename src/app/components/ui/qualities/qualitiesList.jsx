import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, allQualities } = useQuality();

    const qualitiesListUser = allQualities.filter((q) =>
        qualities.includes(q._id)
    );
    if (!isLoading) {
        return (
            <>
                {qualitiesListUser.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </>
        );
    } else return "Loading...";
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
