import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";


function AddCourses() {
    const [cats, setCats] = useState([]);
    const [courseData, setCourseData] = useState({
        category: '',
        title: '',
        description: '',
        f_img: '',
        techs: '',

    });

    useEffect(() => {
        try {
            axios.get(baseUrl + '/category/', { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    //console.log(response.data);
                    setCats(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    //console.log(cats);

    const handleChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.value
        });
    }

    const handleFileChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.files[0]
        });
    }

    const formSubmit = (e) => {
        e.preventDefault();
        // console.log('hello');
        const teacherId=localStorage.getItem('teacherId');
        const _formData = new FormData();

        _formData.append('category', courseData.category);
        _formData.append('teacher', teacherId);
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        _formData.append('featured_img', courseData.f_img, courseData.f_img.name);
        _formData.append('techs', courseData.techs);

        try {
            console.log(_formData);
            axios.post(baseUrl + '/course/', _formData,
                { headers: { "Authorization": `Token  ${tokenStr}`, "content-type": "multipart/form-data" } })
                .then((response) => {
                    console.log(response.data);
                    window.location.href = '/add-courses';
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
                                    <h5 className="card-header">Instructor Course Upload Page</h5>
                                    <div className="card-body">
                                        <form>
                                            <div className="mb-3">
                                                <label for="category" className="form-label">Category</label>
                                                <select name='category' onChange={handleChange} className="form-control">
                                                    {cats.map((category, index) => {
                                                        return <option key={index} value={category.id}>{category.title}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label for="title" className="form-label">Title</label>
                                                <input name="title" type="text" onChange={handleChange} className="form-control" id="title" />
                                            </div>
                                            <div className="mb-3">
                                                <label for="description" className="form-label">Description</label>
                                                <textarea className="form-control" onChange={handleChange} name="description" id="description" ></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" for="video">Upload Feature Image</label>
                                                <input type="file" onChange={handleFileChange} name="f_img" className="form-control" id="video" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" for="techs">Technologies</label>
                                                <textarea id="techs" name='techs' onChange={handleChange} className="form-control" placeholder="Pyhton,Go-lang,Java,JavaScript,C,++"></textarea>
                                            </div>

                                            <button type="submit" onClick={(e) => formSubmit(e)} className="btn btn-primary">Upload Course</button>
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

export default AddCourses;