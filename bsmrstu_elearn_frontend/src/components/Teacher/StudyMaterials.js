import { Link } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";

function StudyMaterials() {
    const [studyData, setstudyData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
    const { course_id } = useParams();
    //console.log(teacherId);

    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(baseUrl + '/study-materials/' + course_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    settotalResult(response.data.length);
                    setstudyData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);


    const handleDeleteClick = (study_id) => {
        Swal.fire({
            title: 'Confirm!',
            text: 'Are you sure you want to delete this?',
            icon: 'error',
            confirmButtonText: 'Continue',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(baseUrl + '/study-material/' + study_id, { headers: { "Authorization": `Token  ${tokenStr}`, "content-type": "multipart/form-data" } })
                        .then((res) => {
                            //window.location.reload();
                            Swal.fire('Success', 'Data has been deleted.');
                            try {
                                axios.get(baseUrl + '/study-materials/' + course_id, { headers: { "Authorization": `Token  ${tokenStr}` } })
                                    .then((response) => {
                                        // console.log(response.data);
                                        settotalResult(response.data.length);
                                        setstudyData(response.data);
                                    });
                            } catch (error) {
                                console.log(error);
                            }
                        });

                } catch (error) {
                    Swal.fire('error', 'Data has not been deleted!!')
                }
            } else {
                Swal.fire('error', 'Data has not been deleted!!');
            }
        });
    }
    const downloadFile = (file_url) => {
        window.location.href = file_url;
    }
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className="col-md-3">
                    <TeacherSidebar />
                </aside>
                <section className="col-md-9">
                    <div className="card">
                        <h5 className="card-header">All Study Materials ({totalResult}) <Link className="btn btn-success btn-sm float-end" to={`/add-study/`+course_id}>Add Study Material</Link></h5>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Upload</th>
                                        <th>Remarks</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studyData.map((row, index) =>
                                        <tr>
                                            <td>{row.title}</td>
                                            <td>
                                            <button className="btn btn-outline-primary" onClick={()=>downloadFile(row.upload)}>File</button>
                                            </td>
                                            <td>{row.remarks}</td>
                                            <td>
                                                <button onClick={() => handleDeleteClick(row.id)} className="btn btn-sm btn-danger ms-1"><i class="bi bi-trash"></i></button>
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

export default StudyMaterials;