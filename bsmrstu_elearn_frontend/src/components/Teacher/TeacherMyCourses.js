import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';


const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function TeacherMyCourses() {
    const [courseData, setCourseData] = useState([]);
    const teacherId=localStorage.getItem('teacherId');
    //console.log(teacherId);

    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(baseUrl + '/teacher-courses/'+teacherId, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setCourseData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    // console.log(courseData);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">My Courses</h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Enrolled Student</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courseData.map((course, index)=>
                                    <tr>
                                        <td>
                                            <Link to={"/all-chapters/"+course.id}>{course.title}</Link>
                                            <hr />
                                            {course.course_rating &&
                                                <span>Rating: {course.course_rating}/5</span>
                                            }
                                            {!course.course_rating &&
                                                <span>Rating: 0/5</span>
                                            }
                                            
                                        </td>
                                        <td><img src={course.featured_img} width="80" className="rounded" alt={course.title}/></td>
                                        <td>
                                            <Link to={"/enrolled-students/"+course.id}>{course.total_enrolled_students}</Link>
                                        </td>
                                        <td>
                                            <Link className="btn btn-info btn-sm" to={`/edit-course/`+course.id}>Edit</Link>
                                            <Link className="btn btn-primary btn-sm ms-2" to={`/study-materials/`+course.id}>Study Material</Link>
                                            <Link className="btn btn-success btn-sm ms-2" to={`/add-chapter/`+course.id}>Add Chapter</Link>
                                            <Link className="btn btn-warning btn-sm ms-2" to={`/assign-quiz/`+course.id}>Assign Quiz</Link>
                                            <button className="btn btn-danger btn-sm ms-2">Delete</button>
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

    );
}


export default TeacherMyCourses;