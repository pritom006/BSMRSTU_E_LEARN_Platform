import { Link } from "react-router-dom";import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import TeacherSidebar from "./TeacherSidebar";

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function TeacherDashboard() {
    const teacherId = localStorage.getItem('teacherId');
    const [dashboardrData, setdashboardrData] = useState([]);
    useEffect(() => {
        // fetch current course data
        try {
            axios.get(baseUrl + '/teacher/dashboard/' + teacherId, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    console.log(response.data);
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
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card border-primary">
                                <h5 className="card-header bg-primary text-white">Total Courses</h5>
                                <div>
                                    <h3><Link to="/teacher-my-courses">{dashboardrData.total_teacher_courses}</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-success">
                                <h5 className="card-header bg-success text-white">Total Students</h5>
                                <div>
                                    <h3><Link to="/teacher-users">{dashboardrData.total_teacher_students}</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-info">
                                <h5 className="card-header bg-info text-white">Total Chapters</h5>
                                <div>
                                    <h3><Link to="/teacher-my-courses">{dashboardrData.total_teacher_chapters}</Link></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherDashboard;