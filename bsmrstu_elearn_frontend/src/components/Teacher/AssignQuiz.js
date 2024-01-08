import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import CheckQuizInCourse from "./CheckQuizInCourse";
import { useState, useEffect } from "react";
import axios from 'axios';
import Swal from "sweetalert2";


const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function AssignQuiz() {
    const [quizData, setquizData] = useState([]);
    const [courseData, setcourseData] = useState([]);
    // const [assignStatus, setassignStatus] = useState();
    const teacherId = localStorage.getItem('teacherId');
    const { course_id } = useParams();
    const { quiz_id } = useParams();
    //console.log(teacherId);

    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(baseUrl + '/teacher-quiz/' + teacherId, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setquizData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
        try {
            axios.get(baseUrl + '/course/' + course_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setcourseData(response.data);
                });
        } catch (error) {
            console.log(error);
        }


    }, []);
    // console.log(courseData);
    // const assignQuiz = (quiz_id) => {
    //     const _formData = new FormData();
    //     _formData.append('teacher', teacherId);
    //     _formData.append('course', course_id);
    //     _formData.append('quiz', quiz_id);


    //     try {

    //         axios.post(baseUrl + '/quiz-assign-course/', _formData,
    //             { headers: { "Authorization": `Token  ${tokenStr}`, "content-type": "multipart/form-data" } })
    //             .then((response) => {
    //                 //console.log(response.data);
    //                 //window.location.href = '/add-courses';
    //                 if (response.status === 200 || response.status === 201) {
    //                     window.location.reload();

    //                 }
    //             })
    //     } catch (error) {
    //         console.log(error.response.data);
    //     }
    // }
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Assign Quiz <span className="text-primary">({courseData.title})</span></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quizData.map((row, index) =>
                                        <tr>
                                            <td>
                                                <Link to={`/all-questions/` + row.id}>{row.title}</Link>
                                            </td>
                                                <CheckQuizInCourse quiz={row.id} course={course_id} />
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


export default AssignQuiz;