import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import TeacherSidebar from "./TeacherSidebar";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

//import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";




function TeacherProfileSetting() {
    const [teacherData, setteacherData] = useState({
        'full_name': '',
        'email': '',
        'qualification': '',
        'mobile_no': '',
        'skills': '',
        'status': '',
        'profile_img': '',
        'p_img': '',
    });

    const teacherId = localStorage.getItem('teacherId');
    useEffect(() => {
        // fetch current course data
        try {
            axios.get(baseUrl + '/teacher/' + teacherId, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setteacherData({
                        full_name: response.data.full_name,
                        email: response.data.email,
                        qualification: response.data.qualification,
                        mobile_no: response.data.mobile_no,
                        skills: response.data.skills,
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
        setteacherData({
            ...teacherData,
            [event.target.name]: event.target.value
        });
    }

    const handleFileChange = (event) => {
        setteacherData({
            ...teacherData,
            [event.target.name]: event.target.files[0]
        });
    }

    const submitForm = () => {
        const teacherFormData = new FormData();
        teacherFormData.append("full_name", teacherData.full_name)
        teacherFormData.append("email", teacherData.email)
        teacherFormData.append("qualification", teacherData.qualification)
        teacherFormData.append("mobile_no", teacherData.mobile_no)
        teacherFormData.append("skills", teacherData.skills)

        if (teacherData.p_img !== '') {
            teacherFormData.append('profile_img', teacherData.p_img, teacherData.p_img.name);
        }

        try {
            axios.put(baseUrl + '/teacher/' + teacherId, teacherFormData, { headers: { "Authorization": `Token  ${tokenStr}` } }).then((response) => {
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
            setteacherData({ 'status': 'error' });
        }

    };

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if (teacherLoginStatus !== 'true') {
        window.location.href = '/teacher-login';
    }

    useEffect(() => {
        document.title = "TeacherProfile"
    })
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Profile Setting</h5>
                        <div className="card-body">
                            <div className="mb-3 row">
                                <label for="staticName" className="col-sm-2 col-form-label">Full Name</label>
                                <div className="col-sm-10">
                                    <input type="text" value={teacherData.full_name} onChange={handleChange} name="full_name" className="form-control" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input value={teacherData.email} onChange={handleChange} name="email" type="email" readonly class="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-2 col.form-label" for="video">Upload Profile Image</label>
                                <div className="col-sm-10">
                                    <input type="file" onChange={handleFileChange} name="p_img" className="form-control" id="video" />
                                    {teacherData.profile_img &&
                                        <p className="mt-2"><img src={teacherData.profile_img} alt={teacherData.full_name} width="300" /></p>
                                    }
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">Skills</label>
                                <div className="col-sm-10">
                                    <textarea value={teacherData.skills} onChange={handleChange} name="skills" className="form-control"></textarea>
                                    <div id="emailHelp" className="form-text">Php, Python, JavaScript</div>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Qualification</label>
                                <div className="col-sm-10">
                                    <textarea value={teacherData.qualification} onChange={handleChange} name="qualification" className="form-control"></textarea>
                                    <div id="emailHelp" className="form-text">BSC | MSC</div>
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

export default TeacherProfileSetting;