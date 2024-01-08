import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function Login() {
    const [studentLoginData, setstudentLoginData] = useState({
        email:"",
        password:""
    });

    const [errorMsg, seterrorMsg] = useState('');

    const handleChange = (event) => {
        setstudentLoginData({
            ...studentLoginData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm = () => {
        // console.log(teacherLoginData);
        const studentFormData = new FormData;
        studentFormData.append('email',studentLoginData.email);
        studentFormData.append('password',studentLoginData.password);
        try{
            axios.post(baseUrl+'/student-login/',studentFormData, { headers: {"Authorization" : `Token  ${tokenStr}`} })
            .then((response)=>{
                // console.log(response.data);
                if(response.data.bool==true) {
                    localStorage.setItem('studentLoginStatus',true);
                    localStorage.setItem('studentId',response.data.student_id);
                    window.location.href='/user-dashboard';
                } else {
                    seterrorMsg('Invalid Username Or Password');
                }
            })
        } catch(error) {
            console.log(error);
        }
    }

    const studentLoginStatus=localStorage.getItem('studentLoginStatus');
    if(studentLoginStatus==='true') {
        window.location.href='/user-dashboard';
    }

    useEffect(()=>{
        document.title = 'Student Login';
    })
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">User Login</h5>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                                <div className="mb-3">
                                    <label for="" className="form-label">Email</label>
                                    <input type="email" value={studentLoginData.email} onChange={handleChange} name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" value={studentLoginData.password} onChange={handleChange} name="password" class="form-control" id="exampleInputPassword1" />
                                </div>
                                {/* <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Remember me</label>
                                </div> */}
                                <button type="submit" onClick={submitForm} class="btn btn-primary">Login</button>                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;