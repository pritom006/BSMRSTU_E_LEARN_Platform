import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';



const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function QuizResult(props) {
    const [resultData, setresultData] = useState([]);
    
    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(`${baseUrl}/fetch-quiz-result/${props.quiz}/${props.student}`, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setresultData(response.data);
                });
        } catch (error) {
            console.log(error);
        }

    }, []);
   

    return (       
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Quiz Result</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <table className="table table-bordered">
                            <tr>
                                <td>Total Questions</td>
                                <td>{resultData.total_questions}</td>
                            </tr>
                            <tr>
                                <td>
                                    Attempted Questions
                                </td>
                                <td>{resultData.total_attempted_questions}</td>
                            </tr>
                            <tr>
                                <td>Total Correct Questions</td>
                                <td>{resultData.total_correct_questions}</td>
                            </tr>
                        </table>
                    </div>                   
                </div>
            </div>
        

    );
}


export default QuizResult;