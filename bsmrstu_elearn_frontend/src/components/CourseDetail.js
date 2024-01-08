import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

const siteUrl = 'http://127.0.0.1:8000/';
const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";


function CourseDetail() {
    const [courseData, setcourseData] = useState([]);
    const [chapterData, setchapterData] = useState([]);
    const [teacherData, setteacherData] = useState([]);
    const [techListData, settechListData] = useState([]);
    const [relatedcourseData, setrelatedcourseData] = useState([]);
    const [userLoginStatus, setuserLoginStatus] = useState();
    const [enrollStatus, setenrollStatus] = useState();
    const [ratingStatus, setratingStatus] = useState();
    const [courseViews, setcourseViews] = useState(0);
    const [AvgRating, setAvgRating] = useState(0);
    const [favoriteStatus, setfavoriteStatus] = useState();
    const studentId = localStorage.getItem('studentId');
    let { course_id } = useParams();
    useEffect(() => {
        try {
            axios.get(baseUrl + '/course/' + course_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    setcourseData(response.data);
                    setchapterData(response.data.course_chapters);
                    setteacherData(response.data.teacher);
                    setrelatedcourseData(JSON.parse(response.data.related_videos));
                    settechListData(response.data.tech_list);
                    if (response.data.course_rating != "" && response.data.course_rating != null) {
                        setAvgRating(response.data.course_rating);
                    }
                });

            // Update views

            axios.get(baseUrl + '/update-view/' + course_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    console.log(response.data.views);
                    setcourseViews(response.data.views);
                });
        } catch (error) {
            console.log(error);
        }



        // fetch enroll status
        try {
            axios.get(baseUrl + '/fetch-enroll-status/' + studentId + '/' + course_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    console.log(response);
                    if (response.data.bool == true) {
                        setenrollStatus('success');
                    }

                });
        } catch (error) {
            console.log(error);
        }

        try {
            axios.get(baseUrl + '/fetch-rating-status/' + studentId + '/' + course_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    console.log(response);
                    if (response.data.bool == true) {
                        setratingStatus('success');
                    }

                });
        } catch (error) {
            console.log(error);
        }

        try {
            axios.get(baseUrl + '/fetch-favorite-status/' + studentId + '/' + course_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    console.log(response);
                    if (response.data.bool == true) {
                        setfavoriteStatus('success');
                    }
                    else {
                        setfavoriteStatus('');
                    }

                });
        } catch (error) {
            console.log(error);
        }

        const studentLoginStatus = localStorage.getItem('studentLoginStatus');
        if (studentLoginStatus === 'true') {
            setuserLoginStatus('success');
        }
    }, []);

    // enroll in the course
    const enrollCourse = () => {
        const studentId = localStorage.getItem('studentId');
        const _formData = new FormData();

        _formData.append('course', course_id);
        _formData.append('student', studentId);


        try {

            axios.post(baseUrl + '/student-enroll-course/', _formData,
                { headers: { "Authorization": `Token  ${tokenStr}`, "content-type": "multipart/form-data" } })
                .then((response) => {
                    //console.log(response.data);
                    //window.location.href = '/add-courses';
                    if (response.status === 200 || response.status === 201) {
                        Swal.fire({
                            title: "You have successfully enrolled this course!!",
                            icon: 'success',
                            toast: true,
                            timer: 3000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false
                        });
                        setenrollStatus('success');
                    }
                })
        } catch (error) {
            console.log(error.response.data);
        }
    }

    // Mark as a favourite course
    const markAsFavot = () => {
        const _formData = new FormData();
        _formData.append('course', course_id);
        _formData.append('student', studentId);
        _formData.append('status', true);

        try {
            axios.post(baseUrl + '/student-add-favorite-course/', _formData, { headers: { "Authorization": `Token  ${tokenStr}`, "content-type": "multipart/form-data" } })
                .then((response) => {
                    console.log(response.data);
                    //window.location.href='/add-chapter/1';
                    if (response.status == 200 || response.status == 201) {
                        Swal.fire({
                            title: "This course has been added to your course list",
                            icon: 'success',
                            toast: true,
                            timer: 3000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false
                        });
                        setfavoriteStatus('success');
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    // remove as favourite
    const removeFavot = () => {
        const _formData = new FormData();
        _formData.append('course', course_id);
        _formData.append('student', studentId);
        _formData.append('status', false);

        try {
            axios.get(baseUrl + '/student-remove-favorite-course/' + course_id + '/' + studentId, _formData, { headers: { "Authorization": `Token  ${tokenStr}`, "content-type": "multipart/form-data" } })
                .then((response) => {
                    console.log(response.data);
                    //window.location.href='/add-chapter/1';
                    if (response.status == 200 || response.status == 201) {
                        Swal.fire({
                            title: "This course has been removed from your wish list",
                            icon: 'success',
                            toast: true,
                            timer: 3000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false
                        });
                        setfavoriteStatus('');
                    }
                })
        } catch (error) {
            console.log(error);
        }

    }

    const [ratingData, setratingData] = useState({
        rating: '',
        reviews: '',

    });


    const handleChange = (event) => {
        setratingData({
            ...ratingData,
            [event.target.name]: event.target.value
        });
    }



    const formSubmit = () => {
        const _formData = new FormData();
        _formData.append('course', course_id);
        _formData.append('student', studentId);
        _formData.append('rating', ratingData.rating);
        _formData.append('reviews', ratingData.reviews);


        try {
            axios.post(baseUrl + '/course-rating/', _formData, { headers: { "Authorization": `Token  ${tokenStr}`, "content-type": "multipart/form-data" } })
                .then((response) => {
                    console.log(response.data);
                    //window.location.href='/add-chapter/1';
                    if (response.status == 200 || response.status == 201) {
                        Swal.fire({
                            title: "Rating has been added",
                            icon: 'success',
                            toast: true,
                            timer: 3000,
                            position: 'top-right',
                            timerProgressBar: true,
                            showConfirmButton: false
                        });
                        window.location.reload();
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }
    //console.log(relatedcourseData)
    return (
        // <h1>Course Detail {course_id}</h1>
        <div className="container mt-3">
            <div className="row">
                <div className="col-4">
                    <img
                        src={courseData.featured_img}
                        className="img-thumbnail"
                        alt={courseData.title}
                    />
                </div>
                <div className="col-8">
                    <h3>{courseData.title}</h3>
                    <p>
                        {courseData.description}
                    </p>
                    <p className="fw-bold">
                        Course By: <Link to={`/teacher-detail/${teacherData.id}`}>{teacherData.full_name}</Link>
                    </p>
                    <p className="fw-bold">Techs:&nbsp;
                        {techListData.map((tech, index) =>
                            <Link to={`/category/${tech.trim()}`} className="badge badge-pill text-dark bg-warning">{tech.trim()}</Link>
                        )}
                    </p>
                    <p className="fw-bold">Duration: 3 hour 30 minitues</p>
                    <p className="fw-bold">Total Enrolled: {courseData.total_enrolled_students} Students</p>
                    <p className="fw-bold">
                        Rating: {AvgRating}/5
                        {enrollStatus === 'success' && userLoginStatus === 'success' &&
                            <>
                                {ratingStatus !== 'success' &&
                                    <button className="btn btn-success btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#ratingModal">Rating</button>
                                }
                                {ratingStatus == 'success' &&
                                    <small className="badge bg-info text-dark ms-2">You already rated this course</small>
                                }
                                <div className="modal fade" id="ratingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Rate for {courseData.title}</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="mb-3">
                                                        <label for="exampleInputEmail1" className="form-label">Rating</label>
                                                        <select onChange={handleChange} className="form-control" name="rating">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label for="exampleInputPassword1" class="form-label">Review</label>
                                                        <textarea onChange={handleChange} name="reviews" className="form-control" rows="10" />
                                                    </div>

                                                    <button type="button" onClick={formSubmit} className="btn btn-primary">Submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </p>
                    <p className="fw-bold">
                        Views: {courseViews}
                    </p>
                    {enrollStatus === 'success' && userLoginStatus === 'success' &&
                        <p><span>You are already enrolled in this course</span></p>
                    }
                    {userLoginStatus === 'success' && enrollStatus !== 'success' &&
                        <p><button type="button" onClick={enrollCourse} className="btn btn-success">Enroll this course</button></p>
                    }
                    {userLoginStatus === 'success' && favoriteStatus !== 'success' &&
                        <p><button type="button" onClick={markAsFavot} title="Add in your favourite list" className="btn btn-outline-danger"><i className="bi bi-heart-fill"></i></button></p>
                    }
                    {userLoginStatus === 'success' && favoriteStatus === 'success' &&
                        <p><button type="button" onClick={removeFavot} title="Remove from your favourite list" className="btn btn-danger"><i className="bi bi-heart-fill"></i></button></p>
                    }
                    {userLoginStatus !== 'success' &&
                        <p><Link to="/user-login">Please Login to enroll this course</Link></p>
                    }

                </div>
            </div>
            {/* Course Videos */}
            {enrollStatus === 'success' && userLoginStatus === 'success' &&
                <div className="card mt-3">
                    <h5 className="card-header">
                        Course Modules
                    </h5>
                    <ul className="list-group list-group-flush">
                        {chapterData.map((chapter, index) =>
                            <li className="list-group-item">{chapter.title}
                                <span className="float-end">
                                    <span className="me-5">1 Hour 30 Minutes</span>
                                    <button className="btn btn-sm btn-danger float-end" data-bs-toggle="modal" data-bs-target="#videoModal1"><i className="bi-youtube"></i></button>
                                </span>
                                {/* video Modal */}
                                <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Video 1</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="ratio ratio-16x9">
                                                    <iframe src={chapter.video} title={chapter.title} allowfullscreen></iframe>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            }
            <h3 className="pb-1 mb-4 mt-5">
                Related Courses
            </h3>
            <div className="row mb-4">
                {relatedcourseData.map((rcourse, index) =>
                    <div className="col-md-3">
                        <div className="card">
                            <Link target="__blank" to={`/detail/${rcourse.pk}`}>
                                <img src={`${siteUrl}media/${rcourse.fields.featured_img}`} className="card-img-top" alt={rcourse.fields.title} />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/detail/${rcourse.pk}`}>{rcourse.fields.title}</Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CourseDetail;
