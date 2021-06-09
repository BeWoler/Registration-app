import React from "react";
import Toolbar from "./Toolbar";
import "../styles/usersTable.css";

export default function UsersTable() {
  let date = new Date();

  return (
    <div className="table__box">
      <Toolbar />
      <div className="table">
        <table className="table__users">
          <tbody>
            <tr>
              <th>
                <input type="checkbox" id="checkedAll" />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date of registration</th>
              <th>Last login date</th>
              <th>Status</th>
            </tr>

            <tr className="table__item">
              <td>
                <input type="checkbox" />
              </td>
              <td>1</td>
              <td>Misha</td>
              <td>bewoler@gmail.com</td>
              <td>11.11.11</td>
              <td>
                {date.getDay()}.{date.getMonth()}.{date.getFullYear()}
              </td>
              <td>Online</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}
