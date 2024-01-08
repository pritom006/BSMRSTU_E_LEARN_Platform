import { Link, useParams } from "react-router-dom";
//import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';



const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function CheckQuizStatusForStudent(props) {
    const [quizData, setquizData] = useState([]);
    const studentId=localStorage.getItem('studentId');
   

    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(`${baseUrl}/fetch-quiz-attempt-status/${props.quiz}/${props.student}`, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setquizData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
        
    }, []);

    return (
        <td>
            {quizData.bool==false &&
                <Link to={`/take-quiz/${props.quiz}`} className="btn btn-success btn-sm ms-2">Take Quiz</Link>
            }
            {quizData.bool==true &&
                <span className="text-success">Attempted</span>
            }
        </td>

    );
}


export default CheckQuizStatusForStudent;