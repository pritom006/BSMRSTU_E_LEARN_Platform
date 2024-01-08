import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

//import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";




function ProfileSetting() {
    const [studentData, setstudentData] = useState({
        'full_name': '',
        'email': '',
        'username': '',
        'interested_categories': '',
        'profile_img': '',
        'p_img': '',
    });

    const studentId = localStorage.getItem('studentId');
    useEffect(() => {
        // fetch current course data
        try {
            axios.get(baseUrl + '/student/' + studentId, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setstudentData({
                        full_name: response.data.full_name,
                        email: response.data.email,
                        username: response.data.username,
                        interested_categories: response.data.interested_categories,
                        profile_img: response.data.profile_img,
                        p_img: "",

                    });
                });
        } catch (error) {
            console.log(error);
        }
        //end
    }, []);

    const handleChange = (event) => {
        setstudentData({
            ...studentData,
            [event.target.name]: event.target.value
        });
    }

    const handleFileChange = (event) => {
        setstudentData({
            ...studentData,
            [event.target.name]: event.target.files[0]
        });
    }

    const submitForm = () => {
        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name)
        studentFormData.append("email", studentData.email)
        studentFormData.append("username", studentData.username)
        studentFormData.append("interested_categories", studentData.interested_categories)

        if (studentData.p_img !== '') {
            studentFormData.append('profile_img', studentData.p_img, studentData.p_img.name);
        }

        try {
            axios.put(baseUrl + '/student/' + studentId, studentFormData, { headers: { "Authorization": `Token  ${tokenStr}` } }).then((response) => {
                if (response.status == 200) {
                    Swal.fire({
                        title: 'Your Profile data has been updated..',                           
                        icon: 'success',
                        toast:true,
                        timer:6000,
                        position:'top-left',
                        timerProgressBar: true,
                        confirmButtonText: 'Continue',
                        showConfirmButton: false,
                    });
                }
                // console.log(response.data);
            });
        } catch (error) {
            console.log(error);
            setstudentData({ 'status': 'error' });
        }

    };

    const studentLoginStatus = localStorage.getItem('studentLoginStatus')
    if (studentLoginStatus !== 'true') {
        window.location.href = '/user-login';
    }

    useEffect(() => {
        document.title = "StudentProfile"
    })
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Profile Setting</h5>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label for="staticName" className="col-sm-2 col-form-label">Full Name</label>
                                <div className="col-sm-10">
                                    <input type="text" value={studentData.full_name} onChange={handleChange} name="full_name" className="form-control" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input value={studentData.email} onChange={handleChange} name="email" type="email" readonly class="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2 col.form-label" for="video">Upload Profile Image</label>
                                <div className="col-sm-10">
                                    <input type="file" onChange={handleFileChange} name="p_img" className="form-control" id="video" />
                                    {studentData.profile_img &&
                                        <p className="mt-2"><img src={studentData.profile_img} alt={studentData.full_name} width="300" /></p>
                                    }
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">Username</label>
                                <div className="col-sm-10">
                                    <input type='text' value={studentData.username} onChange={handleChange} name="username" className="form-control" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Interested Categories</label>
                                <div className="col-sm-10">
                                    <textarea value={studentData.interested_categories} onChange={handleChange} name="interested_categories" className="form-control"></textarea>
                                    <div id="emailHelp" className="form-text">Python, Php, JavaScript</div>
                                </div>
                            </div>
                            <hr />
                            <button className="btn btn-primary" onClick={submitForm}>Update</button>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}

export default ProfileSetting;