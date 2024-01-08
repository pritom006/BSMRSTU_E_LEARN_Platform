import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from 'axios';


const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function TakeQuiz() { 
    const [questionData, setquestionData] = useState([]);
    const { quiz_id } = useParams();
    const studentId = localStorage.getItem('studentId');
    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(baseUrl + '/quiz-questions/' + quiz_id+'/1', { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    setquestionData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
        document.title = 'Attempt Quiz';
    }, []);

    const submitAnswer = (question_id, right_ans) => {
        const _formData = new FormData();
        _formData.append('student',studentId);
        _formData.append('quiz',quiz_id);
        _formData.append('question',question_id);
        _formData.append('right_ans',right_ans);

        try{
            axios.post(baseUrl+'/attempt-quiz/', _formData,{ headers: {"Authorization" : `Token  ${tokenStr}`, "content-type": "multipart/form-data"} })
            .then((response)=>{
                //console.log(response.data);
                //window.location.href='/add-chapter/1';
                if(response.status==200||response.status==201) {
                    try {
                        axios.get(baseUrl + '/quiz-questions/'+quiz_id+'/next-question/'+question_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                            .then((response) => {
                                setquestionData(response.data);
                            });
                    } catch (error) {
                        console.log(error);
                    }
                }
            })
        }catch(error){
            console.log(error);
        }
        
    }
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <h4 className="mb-3 border-bottom pb-1">Quiz Title</h4>
                    {questionData.map((row, index) => 
                    <div className="card">
                        <h5 className="card-header">{row.questions}</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <tbody>      
                                   
                                <>                       
                                    <tr>
                                        <td><button onClick={()=>submitAnswer(row.id, row.ans1)} className="btn btn-outline-secondary">{row.ans1}</button></td>                                                                                                     
                                    </tr>
                                    <tr>
                                        <td><button onClick={()=>submitAnswer(row.id, row.ans2)} className="btn btn-outline-secondary">{row.ans2}</button></td>                                                                                                     
                                    </tr>
                                    <tr>
                                        <td><button onClick={()=>submitAnswer(row.id, row.ans3)} className="btn btn-outline-secondary">{row.ans3}</button></td>                                                                                                     
                                    </tr>
                                    <tr>
                                        <td><button onClick={()=>submitAnswer(row.id, row.ans4)} className="btn btn-outline-secondary">{row.ans4}</button></td>                                                                                                     
                                    </tr>  
                                    </>  
                                                             
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                    )} 
                </section>
            </div>
        </div>

    );
}


export default TakeQuiz;