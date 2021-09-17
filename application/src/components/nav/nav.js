import React from "react";
import { useDispatch, connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from '../../redux/actions/authActions';
import "./nav.css";

const mapStateToProps = state => ({
    email: state.auth.email
})

const Nav = () => {
    const dispatch = useDispatch();
    const history = useHistory();


    const logOutOnClick = () => {
        dispatch(logoutUser());
        history.push('/');
    }
    return (
        <div className="nav-strip">
            <Link to={"/order"} className="nav-link">
                <div className="nav-link-style">
                    <label className="nav-label">Order Form</label>
                </div>
            </Link>
            <Link to={"/view-orders"} className="nav-link" id="middle-link">
                <div className="nav-link-style">
                    <label className="nav-label">View Orders</label>
                </div>
            </Link>
            <div onClick={logOutOnClick} className="nav-link">
                <div className="nav-link-style">
                    <label className="nav-label">Log Out</label>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(Nav);