import React from "react";
import PropTypes from "prop-types";
const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((colum) => (
                    <th
                        key={colum}
                        onClick={
                            columns[colum].path
                                ? () => handleSort(columns[colum].path)
                                : undefined
                        }
                        {...{ role: columns[colum].path && "button" }}
                        scope="col"
                    >
                        {columns[colum].name}
                        {columns[colum].path && columns[colum].path === selectedSort.path
                            ? (
                                <i
                                    className={
                                        "bi bi-caret-" +
                                    (selectedSort.order === "asc"
                                        ? "up"
                                        : "down") +
                                    "-fill"
                                    }
                                ></i>
                            )
                            : null}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    columns: PropTypes.object,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object
};
export default TableHeader;
