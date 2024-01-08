import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';


const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function PopularTeachers() {
    const [teacher, setTeacher] = useState(null);
    useEffect(()=> {
        axios.get(baseUrl+'/teacher/', { headers: {"Authorization" : `Token  ${tokenStr}`} }).then((response)=>{
            setTeacher(response.data);
        });

    },[]);
    console.log(teacher);
    return (
        <div className="container mt-3">
            <h3 className="pb-1 mb-4">
                Popular Teachers
            </h3>
            <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <Link to="/teacher-detail/1">
                            <img src="popular-teacher.jpg" className="card-img-top rounded mx-auto d-block" alt="..." />
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to="/teacher-detail/1">Popular Teacher</Link>
                            </h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>
                                    Rating: 4.5/5
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#">
                            <img src="popular-teacher.jpg" className="card-img-top rounded mx-auto d-block" alt="..." />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#">Popular Teacher</a>
                            </h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>
                                    Rating: 4.5/5
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#">
                            <img src="popular-teacher.jpg" className="card-img-top rounded mx-auto d-block" alt="..." />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#">Popular Teacher</a>
                            </h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>
                                    Rating: 4.5/5
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#">
                            <img src="popular-teacher.jpg" className="card-img-top rounded mx-auto d-block" alt="..." />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#">Popular Teacher</a>
                            </h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>
                                    Rating: 4.5/5
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#">
                            <img src="popular-teacher.jpg" className="card-img-top rounded mx-auto d-block" alt="..." />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#">Popular Teacher</a>
                            </h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>
                                    Rating: 4.5/5
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#">
                            <img src="popular-teacher.jpg" className="card-img-top rounded mx-auto d-block" alt="..." />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#">Popular Teacher</a>
                            </h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>
                                    Rating: 4.5/5
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#">
                            <img src="popular-teacher.jpg" className="card-img-top rounded mx-auto d-block" alt="..." />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#">Popular Teacher</a>
                            </h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>
                                    Rating: 4.5/5
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <a href="#">
                            <img src="popular-teacher.jpg" className="card-img-top rounded mx-auto d-block" alt="..." />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">
                                <a href="#">Popular Teacher</a>
                            </h5>
                        </div>
                        <div className="card-footer">
                            <div className="title">
                                <span>
                                    Rating: 4.5/5
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* End popular Courses */}
            {/* pagination start */}
            {/* <nav aria-label="Page navigation example mt-5">
                <ul class="pagination justify-content-center">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav> */}
            {/* End pagination */}
        </div>
    );
}

export default PopularTeachers;