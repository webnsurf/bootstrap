import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Header: FC = () => (
  <div className="header">
    <nav>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active" exact>Home</NavLink>
        </li>

        <li>
          <NavLink to="/about" activeClassName="active">About</NavLink>
        </li>
      </ul>
    </nav>
  </div>
);
