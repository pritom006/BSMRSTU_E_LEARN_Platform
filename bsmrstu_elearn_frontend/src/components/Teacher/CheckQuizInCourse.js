import { Link, useParams } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';



const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function CheckQuizInCourse(props) {
    const [quizData, setquizData] = useState([]);
    const teacherId=localStorage.getItem('teacherId');
   

    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(`${baseUrl}/fetch-quiz-assign-status/${props.quiz}/${props.course}`, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setquizData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
        
    }, []);
    // assign quiz to course
    const assignQuiz = (quiz_id) => {
        const _formData = new FormData();
        _formData.append('teacher', teacherId);
        _formData.append('course', props.course);
        _formData.append('quiz', props.quiz);


        try {

            axios.post(baseUrl + '/quiz-assign-course/', _formData,
                { headers: { "Authorization": `Token  ${tokenStr}`, "content-type": "multipart/form-data" } })
                .then((response) => {
                    //console.log(response.data);
                    //window.location.href = '/add-courses';
                    if (response.status === 200 || response.status === 201) {
                        window.location.reload();
                      
                    }
                })
        } catch (error) {
            console.log(error.response.data);
        }
    }
    return (
        <td>
            {quizData.bool==false &&
                <button onClick={()=>assignQuiz(props.quiz)} className="btn btn-success btn-sm ms-2">Assign Quiz</button>
            }
            {quizData.bool==true &&
            <>
                <span className="btn btn-sm btn-secondary">Assigned</span>
                &nbsp;
                <Link className="btn btn-sm btn-info" to={`/attempted-students/`+props.quiz}>Attempted Students</Link>
            </>
            }
        </td>

    );
}


export default CheckQuizInCourse;