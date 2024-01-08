import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";


const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";


function ChangePassword() {

    const [studentData, setstudentData] = useState({
        'password': '',
        
    });

    const studentId = localStorage.getItem('studentId');

    const handleChange = (event) => {
        setstudentData({
            ...studentData,
            [event.target.name]: event.target.value
        });
    }

    const submitForm = () => {
        const studentFormData = new FormData();
        studentFormData.append("password", studentData.password)
      
        try {
            axios.post(baseUrl + '/student/change-password/' + studentId, studentFormData, { headers: { "Authorization": `Token  ${tokenStr}` } }).then((response) => {
                if (response.status == 200) {
                    window.location.href = '/user-logout';
                } else {
                    alert('Oops..! Some error occured')
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
        document.title = "Student change password"
    })
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <Sidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">Change Password</h5>
                        <div className="card-body">
                            <div class="mb-3 row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">New Password</label>
                                <div class="col-sm-10">
                                    <input type="text"  value={studentData.password} onChange={handleChange} name="password" class="form-control" id="inputPassword" />
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

export default ChangePassword;