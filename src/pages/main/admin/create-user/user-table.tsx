import React from "react";

const UserTable: React.FC = () => {
    return (
        <table className="user-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email Address</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Sandy Wong</td>
                    <td>sandywongbvt2024@gmail.com</td>
                    <td>
                        <button className="user-table-action-button">Actions</button>
                        <button className="user-table-delete-button">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
};

export default UserTable;