import React from 'react';
import { navArray } from '../../const';
import { Link, useLocation } from 'react-router-dom';
import './AppHeader.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/reducers/authSlice';

const AppHeader = (props) => {
  const { username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  return (
    <div className="header">
      {username && <p className="user-name">{username.slice(0, 2)}</p>}
      <nav className="nav">
        <button onClick={() => dispatch(logout())}>logout</button>

        {navArray.map((elem, i) => (
          <Link
            className={
              pathname === elem.link ? 'nav-link active-link ' : 'nav-link '
            }
            to={elem.link}
            key={i}
          >
            <img src={elem.img} alt="nav-item" />
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AppHeader;
