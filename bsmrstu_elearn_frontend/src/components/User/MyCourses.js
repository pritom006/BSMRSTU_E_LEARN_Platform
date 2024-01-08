import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from 'axios';


const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function MyCourses() {
    const [courseData, setcourseData] = useState([]);
    const studentId = localStorage.getItem('studentId');
    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(baseUrl + '/fetch-enrolled-courses/' + studentId, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setcourseData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">My Courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Created By</th>
                                        <th>Quiz</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseData.map((row,index) => 
                                    <tr>
                                        <td><Link to={`/detail/`+row.course.id}>{row.course.title}</Link></td>
                                        <td>
                                            <Link to={`/teacher-detail/`+row.course.teacher.id}>{row.course.teacher.full_name}</Link>
                                        </td>   
                                        <td>
                                            <Link className="btn btn-sm btn-warning" to={`/course-quiz/`+row.course.id}>Quiz List</Link>                                         
                                            <Link className="btn btn-primary btn-sm ms-2" to={`/user/study-materials/`+row.course.id}>Study Material</Link>  
                                        </td>                 
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    );
}


export default MyCourses;