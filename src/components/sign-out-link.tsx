import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "./app";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { signOut } from "../store/api-actions/api-actions-user";

export function SignOutLink() {
    const dispatch = useDispatch<AppDispatch>();
    const handleSignOut = useCallback(() => {
      dispatch(signOut());
    }, [dispatch]);
return(
<React.Fragment>
            <li className="user-block__item">
              <div className="user-block__avatar">
                <Link to={AppRoute.MyListPage}>
                  <img src="img/avatar.jpg" alt="user-avatar" width="63" height="63" />
                </Link>
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link" onClick={handleSignOut}>Sign out</a>
            </li>
          </React.Fragment>
)};