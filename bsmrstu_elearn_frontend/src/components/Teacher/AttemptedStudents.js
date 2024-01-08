import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import QuizResult from "./QuizResult";
import { useState, useEffect } from "react";
import axios from 'axios';
import Swal from "sweetalert2";


const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function AttemptedStudents() {
    const [studentData, setstudentData] = useState([]);
    // const teacherId = localStorage.getItem('teacherId');
    const { quiz_id } = useParams();


    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(baseUrl + '/attempted-quiz/' + quiz_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setstudentData(response.data);
                });
        } catch (error) {
            console.log(error);
        }



    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Student List</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentData.map((row, index) =>
                                        <tr>
                                            <td>
                                                {row.student.full_name}
                                            </td>
                                            <td>
                                                {row.student.email}
                                            </td>
                                            <td>
                                                {row.student.username}
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#resultModal${row.id}`}>
                                                    Quiz Result
                                                </button>
                                                <div className="modal fade" id={`resultModal${row.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <QuizResult quiz={row.quiz.id} student={row.student.id} />
                                                </div>
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


export default AttemptedStudents;