import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';


const baseUrl = 'http://127.0.0.1:8000/api/student/';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function Register() {
    useEffect(()=> {
        document.title='Teacher Register';
    })
    const [studentData, setstudentData] = useState({
        'full_name': '',
        'email': '',
        'password': '',
        'username': '',
        'interested_categories': '',
        'status': '',
    });

    const handleChange = (event) => {
        setstudentData({
            ...studentData,
            [event.target.name]: event.target.value
        });
        //console.log(event.target.name, event.target.value);
    }

    const submitForm=()=>{
        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name)
        studentFormData.append("email", studentData.email)
        studentFormData.append("password", studentData.password)
        studentFormData.append("username", studentData.username)
        studentFormData.append("interested_categories", studentData.interested_categories)
      
        try {
            axios.post(baseUrl,studentFormData,{ headers: {"Authorization" : `Token  ${tokenStr}`} }).then((response)=>{
                setstudentData({
                    'full_name':'',
                    'email':'',
                    'password':'',
                    'username':'',
                    'interested_categories':'',
                    'status':'success',
                });
                // console.log(response.data);
            });
        } catch(error){
            console.log(error);
            setstudentData({'status':'error'});
        }
        
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {studentData.status=='success' && <p className="text-success">Thanks for your registration</p>}
                    {!studentData.status=='error' && <p className="text-danger">Something wrong with credentials!!</p>}
                    <div className="card">
                        <h5 className="card-header">User Register</h5>
                        <div className="card-body">

                            <div className="mb-3">
                                <label for="" className="form-label">Full Name</label>
                                <input type="text" value={studentData.full_name} onChange={handleChange} name='full_name' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label for="" className="form-label">Email</label>
                                <input type="email" value={studentData.email} onChange={handleChange} name='email' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label for="" className="form-label">User Name</label>
                                <input type="text" value={studentData.username} onChange={handleChange} name='username' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" value={studentData.password} onChange={handleChange} name='password' class="form-control" id="exampleInputPassword1" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Interest</label>
                                <textarea name='interested_categories' value={studentData.interested_categories} onChange={handleChange} className="form-control"></textarea>
                                <div id="emailHelp" className="form-text">Php, python, java etc</div>
                            </div>
                            <button type="submit" onClick={submitForm} class="btn btn-primary">Register</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;