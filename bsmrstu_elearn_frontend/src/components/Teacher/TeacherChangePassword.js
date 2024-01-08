import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";


const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";


function TeacherChangePassword() {

    const [teacherData, setteacherData] = useState({
        'password': '',
        
    });

    const teacherId = localStorage.getItem('teacherId');

    const handleChange = (event) => {
        setteacherData({
            ...teacherData,
            [event.target.name]: event.target.value
        });
    }

    const submitForm = () => {
        const teacherFormData = new FormData();
        teacherFormData.append("password", teacherData.password)
      
        try {
            axios.post(baseUrl + '/teacher/change-password/' + teacherId, teacherFormData, { headers: { "Authorization": `Token  ${tokenStr}` } }).then((response) => {
                if (response.status == 200) {
                    window.location.href = '/teacher-logout';
                } else {
                    alert('Oops..! Some error occured')
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
        document.title = "Instructor change password"
    })
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Change Password</h5>
                        <div className="card-body">
                            <div class="mb-3 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">New Password</label>
                                <div class="col-sm-10">
                                    <input type="text"  value={teacherData.password} onChange={handleChange} name="password" class="form-control" id="inputPassword" />
                                </div>
                            </div>
                            <hr />
                            <button onClick={submitForm} className="btn btn-primary">Update</button>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
}

export default TeacherChangePassword;