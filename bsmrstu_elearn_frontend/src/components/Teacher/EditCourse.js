import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";


function EditCourse() {
    const [cats, setCats] = useState([]);
    const [courseData, setCourseData] = useState({
        category: '',
        title: '',
        description: '',
        prev_fimg:'',
        f_img: '',
        techs: '',

    });

    const {course_id} =useParams();
    // fetch category when page load
    useEffect(() => {
        try {
            axios.get(baseUrl + '/category/', { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setCats(response.data);
                });
        } catch (error) {
            console.log(error);
        }

        // fetch current course data
        try {
            axios.get(baseUrl + '/teacher-course-detail/' + course_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setCourseData({
                        category: response.data.category,
                        title: response.data.title,
                        description: response.data.description,
                        prev_fimg:response.data.featured_img,
                        f_img: "",
                        techs: response.data.techs,
                    });
                });
        } catch (error) {
            console.log(error);
        }
        //end
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

    const formSubmit = () => {
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('teacher', 1);
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        if(courseData.f_img!==''){
            _formData.append('featured_img', courseData.f_img, courseData.f_img.name);
        }
        
        _formData.append('techs', courseData.techs);

        try {
            axios.put(baseUrl + '/teacher-course-detail/'+course_id, _formData, { headers: { "Authorization": `Token  ${tokenStr}`, "content-type": "multipart/form-data" } })
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
                                    <h5 className="card-header">Update Course</h5>
                                    <div className="card-body">
                                        <form>
                                            <div className="mb-3">
                                                <label for="category" className="form-label">Category</label>
                                                <select value={courseData.category} name='category' onChange={handleChange} className="form-control">
                                                    {cats.map((category, index) => {
                                                        return <option key={index} value={category.id}>{category.title}</option>
                                                    })}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label for="title" className="form-label">Title</label>
                                                <input value={courseData.title}  name="title" type="text" onChange={handleChange} className="form-control" id="title" />
                                            </div>
                                            <div className="mb-3">
                                                <label for="description" className="form-label">Description</label>
                                                <textarea value={courseData.description}  className="form-control" onChange={handleChange} name="description" id="description" ></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" for="video">Upload Feature Image</label>
                                                <input type="file" onChange={handleFileChange} name="f_img" className="form-control" id="video" />
                                                {courseData.prev_fimg &&
                                                    <p className="mt-3"><img src={courseData.prev_fimg} alt={courseData.title} width="300" /></p>
                                                }
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" for="techs">Technologies</label>
                                                <textarea value={courseData.techs}  id="techs" name='techs' onChange={handleChange} className="form-control" placeholder="Pyhton,Go-lang,Java,JavaScript,C,++"></textarea>
                                            </div>

                                            <button type="submit" onClick={formSubmit} className="btn btn-primary">Upload Course</button>
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

export default EditCourse;