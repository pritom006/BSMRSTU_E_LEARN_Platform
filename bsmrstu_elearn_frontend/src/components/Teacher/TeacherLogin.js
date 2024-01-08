import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function TeacherLogin() {
    const [teacherLoginData, setteacherLoginData] = useState({
        email:"",
        password:""
    });

    const [errorMsg, seterrorMsg] = useState('');

    const handleChange = (event) => {
        setteacherLoginData({
            ...teacherLoginData,
            [event.target.name]:event.target.value
        });
    }

    const submitForm = () => {
        // console.log(teacherLoginData);
        const teacherFormData = new FormData;
        teacherFormData.append('email',teacherLoginData.email);
        teacherFormData.append('password',teacherLoginData.password);
        try{
            axios.post(baseUrl+'/teacher-login/',teacherFormData, { headers: {"Authorization" : `Token  ${tokenStr}`} })
            .then((response)=>{
                // console.log(response.data);
                if(response.data.bool==true) {
                    localStorage.setItem('teacherLoginStatus',true);
                    localStorage.setItem('teacherId',response.data.teacher_id);
                    window.location.href='/teacher-dashboard';
                } else {
                    seterrorMsg('Invalid Username Or Password');
                }
            })
        } catch(error) {
            console.log(error);
        }
    }

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus');
    if(teacherLoginStatus==='true') {
        window.location.href='/teacher-dashboard';
    }

    useEffect(()=>{
        document.title = 'Teacher Login';
    })
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card">
                        <h5 className="card-header">Instructor Login</h5>
                        <div className="card-body">
                            {errorMsg && <p className="text-danger">{errorMsg}</p>}
                            
                                <div className="mb-3">
                                    <label for="" className="form-label">Email</label>
                                    <input value={teacherLoginData.email} name="email" onChange={handleChange} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input value={teacherLoginData.password} name="password" onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" for="exampleCheck1">Remember me</label>
                                </div>
                                <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherLogin;