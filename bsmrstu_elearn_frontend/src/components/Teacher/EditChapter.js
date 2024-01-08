import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function EditChapter() {
    const [chapterData, setChapterData] = useState({
        course: '',
        title: '',
        description: '',
        prev_video: '',
        video: '',
        remarks: '',

    });

    const { chapter_id } = useParams();
    useEffect(() => {
        try {
            axios.get(baseUrl + '/chapter/'+chapter_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setChapterData({
                        course: response.data.course,
                        title: response.data.title,
                        description: response.data.description,
                        prev_video: response.data.video,
                        remarks: response.data.remarks,
                        video: ''
                    });
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    const handleChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.value
        });
    }

    const handleFileChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.files[0]
        });
    }

    
    const formSubmit = () => {
        const _formData = new FormData();
        //console.log(chapterData.course);
        _formData.append('course', chapterData.course);
        _formData.append('title', chapterData.title);
        _formData.append('description', chapterData.description);
        if (chapterData.video !== '') {
            _formData.append('video', chapterData.video, chapterData.video.name);
        }
        _formData.append('remarks', chapterData.remarks);

        try {
            axios.put(baseUrl+'/chapter/'+chapter_id, _formData, { headers: { "Authorization": `Token  ${tokenStr}`, "content-type": "multipart/form-data" } })
                .then((response) => {
                    console.log(response.data);
                    //window.location.href = '/add-chapter/1';
                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Data has been updated',                           
                            icon: 'success',
                            toast:true,
                            timer:4000,
                            position:'top-right',
                            timerProgressBar: true,
                            confirmButtonText: 'Continue',
                            showConfirmButton: false,
                        });
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    // fetch courses when the page will be loaded
    
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
                                    <h5 className="card-header">Update Chapter</h5>
                                    <div className="card-body">
                                        <form>
                                            <div className="mb-3">
                                                <label for="title" className="form-label">Title</label>
                                                <input type="text" value={chapterData.title} onChange={handleChange} name='title' className="form-control" id="title" />
                                            </div>
                                            <div className="mb-3">
                                                <label for="description" className="form-label">Description</label>
                                                <textarea value={chapterData.description} className="form-control" onChange={handleChange} name='description' id="description" ></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" for="customFile">Video</label>
                                                <input type="file" onChange={handleFileChange} name='video' className="form-control" id="video" />
                                                {chapterData.prev_video &&
                                                    <video controls width="100%" height="240" className="mt-2">
                                                        <source src={chapterData.prev_video} type="video/mp4" />
                                                    </video>
                                                }
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" for="remarks">Remarks</label>
                                                <textarea id="remarks" vlaue={chapterData.remarks} onChange={handleChange} name='remarks' className="form-control" placeholder="This video is focused on basic introductio to programming"></textarea>
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
    )
}

export default EditChapter;