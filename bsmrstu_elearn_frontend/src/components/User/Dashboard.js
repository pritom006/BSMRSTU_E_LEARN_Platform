import { Link } from "react-router-dom"; import { useState, useEffect } from "react";
import axios from 'axios';

import Sidebar from "./Sidebar";

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function Dashboard() {
    const studentId = localStorage.getItem('studentId');
    const [dashboardrData, setdashboardrData] = useState([]);
    useEffect(() => {
        // fetch current course data
        try {
            axios.get(baseUrl + '/student/dashboard/' + studentId, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    console.log(response);
                    setdashboardrData(response.data);

                });
        } catch (error) {
            console.log(error);
        }
        //end
    }, []);
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className="card-header bg-primary text-white">Enrolled Courses</h5>
                                <div>
                                    <h3><Link to="/my-courses">{dashboardrData.enrolled_courses}</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-success">
                                <h5 className="card-header bg-success text-white">Favourite Courses</h5>
                                <div>
                                    <h3><Link to="/favorite-courses">{dashboardrData.favorite_courses}</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-info">
                                <h5 className="card-header bg-info text-white">Assignments</h5>
                                <div className="card-body">
                                    <h6>
                                        <Link to="/my-assignments"> Completed: {dashboardrData.complete_assignments}, Pending: {dashboardrData.pending_assignments}</Link>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;