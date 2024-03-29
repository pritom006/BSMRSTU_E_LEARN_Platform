import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import CheckQuizStatusForStudent from "./CheckQuizStatusForStudent";


const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function CourseQuizList() {
    const [quizData, setquizData] = useState([]);
    const studentId = localStorage.getItem('studentId');
    const { course_id } = useParams(); 

    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(baseUrl + '/fetch-assigned-quiz/' + course_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setquizData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
        document.title='Quiz List'
    }, []);
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Course Quiz</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Quiz</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>   
                                    {quizData.map((row, index) =>                            
                                    <tr>
                                        <td>{row.quiz.title}</td>
                                        <CheckQuizStatusForStudent quiz={row.quiz.id} student={studentId} />                                                        
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


export default CourseQuizList;