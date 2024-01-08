import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import Swal from "sweetalert2";


const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function AllQuiz() {
    const [quizData, setquizData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    const teacherId=localStorage.getItem('teacherId');
    //console.log(teacherId);

    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(baseUrl + '/teacher-quiz/'+teacherId, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setquizData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    // console.log(courseData);
    const handleDeleteClick = (quiz_id) => {
        Swal.fire({
            title: 'Confirm!',
            text: 'Are you sure you want to delete this?',
            icon: 'error',
            confirmButtonText: 'Continue',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(baseUrl + '/quiz/' + quiz_id, { headers: { "Authorization": `Token  ${tokenStr}`, "content-type": "multipart/form-data" } })
                        .then((res) => {
                            //window.location.reload();
                            Swal.fire('Success', 'Data has been deleted.');
                            try {
                                axios.get(baseUrl + '/teacher-quiz/' + teacherId, { headers: { "Authorization": `Token  ${tokenStr}` } })
                                    .then((response) => {
                                        // console.log(response.data);
                                        settotalResult(response.data.length);
                                        setquizData(response.data);
                                    });
                            } catch (error) {
                                console.log(error);
                            }
                            // console.log(res);
                            // settotalResult(res.data.length);
                            // setChpaterData(res.data);
                        });

                } catch (error) {
                    Swal.fire('error', 'Data has not been deleted!!')
                }
            } else {
                Swal.fire('error', 'Data has not been deleted!!');
            }
        });
    }
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Quiz</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quizData.map((row, index)=>
                                    <tr>
                                        <td>
                                            <Link to={"/all-questions/"+row.id}>{row.title}</Link>                                            
                                        </td>
                                        {/* <td>
                                            <Link to="#">123</Link>
                                        </td> */}
                                        <td>
                                        <Link className="btn btn-info btn-sm" to={`/edit-quiz/`+row.id}>Edit</Link>
                                            <Link className="btn btn-success btn-sm ms-2" to={"/add-quiz-question/"+row.id}>Add Quiz Questions</Link>
                                            <button onClick={()=>handleDeleteClick(row.id)} className="btn btn-danger btn-sm ms-2">Delete</button>
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


export default AllQuiz;