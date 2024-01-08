import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function AddChapter() {    
    const [chapterData,setChapterData] = useState({
        title:'',
        description:'',
        video:'',
        remarks:'',

    });

    const [VideoDuration,setVideoDuration] = useState();

    const handleChange=(event)=> {
        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.value
        });
    }

    const handleFileChange=(event)=> {
        window.URL = window.URL || window.webkitURL
        var video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = function() {
            window.URL.revokeObjectURL(video.src);
            setVideoDuration(video.duration)
        }
        video.src = URL.createObjectURL(event.target.files[0]);

        setChapterData({
            ...chapterData,
            [event.target.name]:event.target.files[0]
        });
    }
    
    const {course_id} = useParams();
    const formSubmit=()=> {
        const _formData = new FormData();
        _formData.append('course',course_id);
        _formData.append('title',chapterData.title);
        _formData.append('description',chapterData.description);
        _formData.append('video',chapterData.video, chapterData.video.name);
        _formData.append('remarks',chapterData.remarks);

        try{
            axios.post(baseUrl+'/course-chapters/'+course_id, _formData,{ headers: {"Authorization" : `Token  ${tokenStr}`, "content-type": "multipart/form-data"} })
            .then((response)=>{
                //console.log(response.data);
                //window.location.href='/add-chapter/1';
                if(response.status==200||response.status==201) {
                    Swal.fire({
                        title: "Data has been added",
                        icon: 'success',
                        toast:true,
                        timer:3000,
                        position:'top-right',
                        timerProgressBar:true,
                        showConfirmButton:false
                    });
                    window.location.reload();
                }
            })
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
                                    <h5 className="card-header">Add Chapter</h5>
                                    <div className="card-body">
                                        <form>
                                            <div className="mb-3">
                                                <label for="title" className="form-label">Title</label>
                                                <input type="text" onChange={handleChange} name='title' className="form-control" id="title" />
                                            </div>
                                            <div className="mb-3">
                                                <label for="description" className="form-label">Description</label>
                                                <textarea className="form-control" onChange={handleChange} name='description' id="description" ></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" for="customFile">Video</label>
                                                <input type="file" onChange={handleFileChange} name='video' className="form-control" id="video" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" for="remarks">Remarks</label>
                                                <textarea id="remarks" onChange={handleChange} name='remarks' className="form-control" placeholder="This video is focused on basic introductio to programming"></textarea>
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

export default AddChapter;