import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";


function EditQuiz() {
    const [quizData, setquizData] = useState({
        category: '',
        title: '',
        description: '',
        prev_fimg:'',
        f_img: '',
        techs: '',

    });

    const teacherId=localStorage.getItem('teacherId');
    const {quiz_id} =useParams();
    // fetch category when page load
    useEffect(() => {
        

        // fetch current course data
        try {
            axios.get(baseUrl + '/teacher-quiz-detail/' + quiz_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setquizData({
                        title: response.data.title,
                        detail: response.data.detail,
                    });
                });
        } catch (error) {
            console.log(error);
        }
        //end
    }, []);
    //console.log(cats);

    const handleChange = (event) => {
        setquizData({
            ...quizData,
            [event.target.name]: event.target.value
        });
    }


    const formSubmit = () => {
        const _formData = new FormData();
        _formData.append('teacher', teacherId);
        _formData.append('title', quizData.title);
        _formData.append('detail', quizData.detail);
        

        try {
            axios.put(baseUrl + '/teacher-quiz-detail/'+quiz_id, _formData, { headers: { "Authorization": `Token  ${tokenStr}`, "content-type": "multipart/form-data" } })
                .then((response) => {
                    //console.log(response.data);
                    //window.location.href = '/add-course';
                    if (response.status == 200) {
                        Swal.fire({
                            title: 'Data has been updated',                           
                            icon: 'success',
                            toast:true,
                            timer:6000,
                            position:'top-left',
                            timerProgressBar: true,
                            confirmButtonText: 'Continue',
                            showConfirmButton: false,
                        });
                    }
                });
        } catch (error) {
            console.log(error);
        }
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
                                    <h5 className="card-header">Edit Quiz</h5>
                                    <div className="card-body">
                                        <form>                                           
                                            <div className="mb-3">
                                                <label for="title" className="form-label">Title</label>
                                                <input value={quizData.title}  name="title" type="text" onChange={handleChange} className="form-control" id="title" />
                                            </div>
                                            <div className="mb-3">
                                                <label for="detail" className="form-label">Detail</label>
                                                <textarea value={quizData.detail}  className="form-control" onChange={handleChange} name="detail" id="detail" ></textarea>
                                            </div>
                                            <button type="submit" onClick={formSubmit} className="btn btn-primary">Edit Quiz</button>
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

export default EditQuiz;