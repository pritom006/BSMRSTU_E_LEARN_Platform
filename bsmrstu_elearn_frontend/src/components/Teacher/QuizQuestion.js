import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function QuizQuestion() {
    const [questionData, setquestionData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    const { quiz_id } = useParams();
    //console.log(teacherId);

    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(baseUrl + '/quiz-questions/' + quiz_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    settotalResult(response.data.length);
                    setquestionData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);


    const handleDeleteClick = (question_id) => {
        Swal.fire({
            title: 'Confirm!',
            text: 'Are you sure you want to delete this?',
            icon: 'error',
            confirmButtonText: 'Continue',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(baseUrl + '/question/' + question_id, { headers: { "Authorization": `Token  ${tokenStr}`, "content-type": "multipart/form-data" } })
                        .then((res) => {
                            //window.location.reload();
                            Swal.fire('Success', 'Data has been deleted.');
                            try {
                                axios.get(baseUrl + '/quiz-questions/' + quiz_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                                    .then((response) => {
                                        // console.log(response.data);
                                        settotalResult(response.data.length);
                                        setquestionData(response.data);
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
                        <h5 className="card-header">All Questions ({totalResult}) <Link className="btn btn-success btn-sm float-end" to={"/add-quiz-question/"+quiz_id}>Add Question</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questionData.map((row, index) =>
                                        <tr>
                                            <td>{row.questions}</td>
                                            <td>
                                                {/* <Link to={`/edit-question/`+row.id} className="btn btn-info btn-sm text-white"><i class="bi bi-pencil-square"></i></Link> */}
                                                <button onClick={() => handleDeleteClick(row.id)} className="btn btn-sm btn-danger ms-1"><i class="bi bi-trash"></i></button>
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
    )
}

export default QuizQuestion;