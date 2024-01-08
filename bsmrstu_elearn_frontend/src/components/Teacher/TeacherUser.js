import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';


const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function TeacherUser() {
    const [StudentData, setStudentData] = useState([]);
    const teacherId=localStorage.getItem('teacherId');
    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(baseUrl + '/fetch-all-enrolled-students/'+teacherId, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setStudentData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    // console.log(courseData);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Student Details</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Interested Categories</th>
                                        <th>Assignment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {StudentData.map((row, index)=>
                                    <tr>
                                        <td><Link to={`/view-student/`+row.student.id}>{row.student.full_name}</Link></td>
                                        <td>{row.student.email}</td>
                                        <td>{row.student.username}</td>
                                        <td>
                                           {row.student.interested_categories}
                                        </td>   
                                        <td>
                                            <Link to={`/show-assignment/${row.student.id}/${teacherId}`} className="btn btn-sm btn-warning">Assignments</Link>
                                            <Link to={`/add-assignment/${row.student.id}/${teacherId}`} className="btn btn-sm btn-success ms-2">Add Assignment</Link>
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


export default TeacherUser;