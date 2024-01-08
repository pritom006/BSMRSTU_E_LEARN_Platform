import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";


function Sidebar() {
    const [notifiData, setnotifiData]=useState([]);
    const studentId=localStorage.getItem('studentId')
    useEffect(()=>{
        try {
            axios.get(baseUrl + '/student/fetch-all-notifications/'+studentId, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    console.log(response);
                    setnotifiData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    },[]);
    return (
        <div className="card">
            <h5 className="card-header">Dashboard</h5>
            <div className="list-group list-group-flush">
                <Link
                    to="/user-dashboard"
                    className="list-group-item list-group-item-action"
                >
                    Dashboard
                </Link>
                <Link
                    to="/my-courses"
                    className="list-group-item list-group-item-action"
                >
                    My Courses
                </Link>
                <Link
                    to="/favourite-courses"
                    className="list-group-item list-group-item-action"
                >
                    Favourite Courses
                </Link>
                <Link
                    to="/recommended-courses"
                    className="list-group-item list-group-item-action"
                >
                    Recommended Courses
                </Link>
                <Link
                    to="/my-assignments"
                    className="list-group-item list-group-item-action"
                >
                    Assignments <span className='float-end badge bg-danger mt-1'>{notifiData.length}</span>
                </Link>
                <Link
                    to="/profile-setting"
                    className="list-group-item list-group-item-action"
                >
                    Profile Settings
                </Link>
                <Link
                    to="/change-password"
                    className="list-group-item list-group-item-action"
                >
                    Change Password
                </Link>
                <Link
                    to="/user-logout"
                    className="list-group-item list-group-item-action text-danger"
                >
                    Logout
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;