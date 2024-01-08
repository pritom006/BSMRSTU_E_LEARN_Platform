import TeacherSidebar from "./TeacherSidebar";
import { useState } from "react";
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";


function AddQuiz() {
    const [quizData, setquizData] = useState({
        title: '',
        detail: '',
    });

  

    const handleChange = (event) => {
        setquizData({
            ...quizData,
            [event.target.name]: event.target.value
        });
    }

  

    const formSubmit = (e) => {
        e.preventDefault();
        // console.log('hello');
        const teacherId=localStorage.getItem('teacherId');
        const _formData = new FormData();

        _formData.append('teacher', teacherId);
        _formData.append('title', quizData.title);
        _formData.append('detail', quizData.detail);

        try {
            console.log(_formData);
            axios.post(baseUrl + '/quiz/', _formData,
                { headers: {"Authorization": `Token  ${tokenStr}`} })
                .then((response) => {
                    console.log(response.data);
                    window.location.href = '/add-quiz';
                })
        } catch (error) {
            console.log(error.response.data);
        }
        //console.log(_formData);
    }
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-6 offset-3">
                                <div className="card">
                                    <h5 className="card-header">Add Quiz</h5>
                                    <div className="card-body">
                                        <form>
                                            <div className="mb-3">
                                                <label for="title" className="form-label">Title</label>
                                                <input name="title" type="text" onChange={handleChange} className="form-control" id="title" />
                                            </div>
                                            <div className="mb-3">
                                                <label for="detail" className="form-label">Detail</label>
                                                <textarea className="form-control" onChange={handleChange} name="detail" id="detail" ></textarea>
                                            </div>
                                            <button type="submit" onClick={(e) => formSubmit(e)} className="btn btn-primary">Add Quiz</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddQuiz;