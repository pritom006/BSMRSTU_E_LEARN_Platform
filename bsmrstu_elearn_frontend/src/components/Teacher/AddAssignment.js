import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function AddAssignment() {    
    const [assignmentData,setassignmentData] = useState({
        title:'',
        detail:'',       
    });

    const handleChange=(event)=> {
        setassignmentData({
            ...assignmentData,
            [event.target.name]:event.target.value
        });
    }

    const {student_id} = useParams();
    const {teacher_id} = useParams();
   
    const formSubmit=()=> {
        const _formData = new FormData();
        _formData.append('teacher',teacher_id);
        _formData.append('title',assignmentData.title);
        _formData.append('detail',assignmentData.detail);
        _formData.append('student',student_id);

        try{
            axios.post(baseUrl+'/student-assignment/'+teacher_id+'/'+student_id, _formData,{ headers: {"Authorization" : `Token  ${tokenStr}`, "content-type": "multipart/form-data"} })
            .then((response)=>{
                //console.log(response.data);
                //window.location.href='/add-chapter/1';
                if(response.status==200||response.status==201) {
                    Swal.fire({
                        title: "Assignment has been added",
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton:false
                    });

                    // save Notification data
                    const _notifiData=new FormData();
                    _notifiData.append('teacher',teacher_id);
                    _notifiData.append('notif_subject','assignment');
                    _notifiData.append('notif_for','student');
                    _notifiData.append('student',student_id);

                    axios.post(baseUrl+'/save-notification/', _notifiData,{ headers: {"Authorization" : `Token  ${tokenStr}`, "content-type": "multipart/form-data"} })
                    .then((response)=>{
                        console.log('Notification Added');
                    })
                    window.location.reload();
                }
            });
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-6 offset-3">
                                <div className="card">
                                    <h5 className="card-header">Add Assignment</h5>
                                    <div className="card-body">
                                        <form>
                                            <div className="mb-3">
                                                <label for="title" className="form-label">Title</label>
                                                <input type="text" onChange={handleChange} name='title' className="form-control" id="title" />
                                            </div>
                                            <div className="mb-3">
                                                <label for="detail" className="form-label">Detail</label>
                                                <textarea className="form-control" onChange={handleChange} name='detail' id="detail" ></textarea>
                                            </div>
                                            
                                            <button type="button" onClick={formSubmit} className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddAssignment;