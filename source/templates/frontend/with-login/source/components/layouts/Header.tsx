import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useUserActions } from 'store/user';

export const Header: FC = () => {
  const userActions = useUserActions();

  return (
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

      <button className="logout" onClick={ userActions.logout }>Logout</button>
    </div>
  );
};
