import { Link, useParams } from "react-router-dom";
//import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";
function TeacherDetail() {
    let { teacher_id } = useParams();
    const [courseData, setcourseData] = useState([]);
    const [teacherData, setteacherData] = useState([]);
    const [skillList, setskillList] = useState([]);

    useEffect(() => {
        try {
            axios.get(baseUrl + '/teacher/' + teacher_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    console.log(response);
                    setteacherData(response.data);
                    setcourseData(response.data.teacher_courses);
                    setskillList(response.data.skill_list);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                    <img
                        src={teacherData.profile_img}
                        className="img-fluid rounded float-left"
                        alt="Course Image"
                    />
                </div>
                <div className="col-8">
                    <h3>{teacherData.full_name}</h3>
                    <p>
                        {teacherData.title}
                    </p>
                    <p className="fw-bold">
                        Skilss:&nbsp;
                        {skillList.map((skill, index) =>
                        <>
                            <Link to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`} className="badge badge-pill text-dark bg-warning">{skill.trim()}</Link>
                        </>    
                        )}
                    </p>
                    <p className="fw-bold">Recent Courses: <Link to="/category/python">Python</Link>, </p>
                    {/* <p className="fw-bold">Rating: 4.5/5</p> */}
                </div>
            </div>
            {/* Course Lists*/}
            <div className="card mt-3">
                <h5 className="card-header">
                    Course Lists
                </h5>
                <div className="list-group list-group-flush">
                    {courseData.map((course, index) =>
                        <Link to={`/detail/${course.id}`} className="list-group-item list-group-item-action">{course.title}</Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TeacherDetail;