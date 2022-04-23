import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
    const renderContent = (item, colum) => {
        if (columns[colum].component) {
            const component = columns[colum].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        return _.get(item, columns[colum].path);
    };
    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id}>
                    {Object.keys(columns).map((colum) => (
                        <td key={colum}>{renderContent(item, colum)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};
TableBody.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.object
};
export default TableBody;
