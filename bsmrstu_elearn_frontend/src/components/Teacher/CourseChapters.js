import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";


const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function CourseChapters() {
    const [chapterData, setChpaterData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    const { course_id } = useParams();
    //console.log(teacherId);

    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(baseUrl + '/course-chapters/' + course_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    settotalResult(response.data.length);
                    setChpaterData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);


    const Swal = require('sweetalert2');
    const handleDeleteClick = (chapter_id) => {
        Swal.fire({
            title: 'Confirm!',
            text: 'Are you sure you want to delete this?',
            icon: 'error',
            confirmButtonText: 'Continue',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(baseUrl + '/chapter/' + chapter_id, { headers: { "Authorization": `Token  ${tokenStr}`, "content-type": "multipart/form-data" } })
                        .then((res) => {
                            //window.location.reload();
                            Swal.fire('Success', 'Data has been deleted.');
                            try {
                                axios.get(baseUrl + '/course-chapters/' + course_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                                    .then((response) => {
                                        // console.log(response.data);
                                        settotalResult(response.data.length);
                                        setChpaterData(response.data);
                                    });
                            } catch (error) {
                                console.log(error);
                            }
                            // console.log(res);
                            // settotalResult(res.data.length);
                            // setChpaterData(res.data);
                        });

                } catch (error) {
                    Swal.fire('error', 'Data has not been deleted!!')
                }
            } else {
                Swal.fire('error', 'Data has not been deleted!!');
            }
        });
    }
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Chapters ({totalResult}) <Link className="btn btn-success btn-sm float-end" to={"/add-chapter/"+course_id}>Add Chapter</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Video</th>
                                        <th>Remarks</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chapterData.map((chapter, index) =>
                                        <tr>
                                            <td><Link to={'/edit-chapter/' + chapter.id}>{chapter.title}</Link></td>
                                            <td>
                                                <video controls width="250">
                                                    <source src={chapter.video.url} type="video/webm" />
                                                    <source src={chapter.video.url} type="video/mp4" />
                                                    Sorry, your browser doesn't support embedded videos.
                                                </video>
                                            </td>
                                            <td>{chapter.remarks}</td>
                                            <td>
                                                <Link to={'/edit-chapter/' + chapter.id} className="btn btn-info btn-sm text-white"><i class="bi bi-pencil-square"></i></Link>
                                                <button onClick={() => handleDeleteClick(chapter.id)} to={'/delete-chapter/' + chapter.id} className="btn btn-sm btn-danger ms-1"><i class="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default CourseChapters;