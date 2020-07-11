import React from "react";

import { Link } from "react-router-dom";

const NavMenu: React.FC = () => {
  return (
    <ul>
      <li>
        {" "}
        <Link to="/documents">Documents</Link>
      </li>
    </ul>
  );
};

export default NavMenu;
