import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';


const baseUrl = 'http://127.0.0.1:8000/api/teacher/';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";
function TeacherRegister() {
    //useEffect
    useEffect(()=> {
        document.title='Teacher Register';
    })
    // useState
    const [teacherData, setteacherData] = useState({
        'full_name':'',
        'email':'',
        'password':'',
        'qualification':'',
        'mobile_no':'',
        'skills':'',
        'status':'',
    });
    // From change
    const handleChange=(event)=>{
        setteacherData({
            ...teacherData,
            [event.target.name]:event.target.value
        });
        //console.log(event.target.name, event.target.value);
    }
   // console.log(teacherData);
    // End change

    // submit form
    const submitForm=()=>{
        const teacherFormData = new FormData();
        teacherFormData.append("full_name", teacherData.full_name)
        teacherFormData.append("email", teacherData.email)
        teacherFormData.append("password", teacherData.password)
        teacherFormData.append("qualification", teacherData.qualification)
        teacherFormData.append("mobile_no", teacherData.mobile_no)
        teacherFormData.append("skills", teacherData.skills)
        
        try {
            axios.post(baseUrl,teacherFormData,{ headers: {"Authorization" : `Token  ${tokenStr}`} }).then((response)=>{
                setteacherData({
                    'full_name':'',
                    'email':'',
                    'password':'',
                    'qualification':'',
                    'mobile_no':'',
                    'skills':'',
                    'prev_img':'',
                    'f_img':'',
                    'status':'success',
                });
                // console.log(response.data);
            });
        } catch(error){
            console.log(error);
            setteacherData({'status':'error'});
        }
        
    };

    const teacherLoginStatus=localStorage.getItem('teacherLoginStatus')
    if(teacherLoginStatus=='true') {
        window.location.href='/teacher-dashboard';
    }
    
    // end submitform
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-6 offset-3">
                    {teacherData.status=='success' && <p className="text-success">Thanks for your registration</p>}
                    {!teacherData.status=='error' && <p className="text-danger">Something wrong with credentials!!</p>}
                    <div className="card">
                        <h5 className="card-header">Teacher Register</h5>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label for="" className="form-label">Full Name</label>
                                    <input value={teacherData.full_name} onChange={handleChange} name="full_name" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />        
                                </div>
                                <div className="mb-3">
                                    <label for="" className="form-label">Email</label>
                                    <input value={teacherData.email}  onChange={handleChange} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input value={teacherData.password}  onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Qualification</label>
                                    <input value={teacherData.qualification}  onChange={handleChange} name="qualification" type="text" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Cell No</label>
                                    <input value={teacherData.mobile_no} onChange={handleChange} name="mobile_no" type="number" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Skills</label>
                                    <textarea value={teacherData.skills} onChange={handleChange} name="skills" className="form-control"></textarea>
                                    <div id="emailHelp" className="form-text">Php, python, java etc</div>
                                </div>
                                <button onClick={submitForm} type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherRegister;