import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';
const tokenStr = "6ef756a665d56de13ea00912f1bffe5566af36fb";
function Category() {
    const [categoryData, setcategoryData] = useState([]);

    // fetch courses when the page will be loaded
    useEffect(() => {
        try {
            axios.get(baseUrl + '/category/', { headers: { "Authorization": `Token  ${tokenStr}` } })
                .then((response) => {
                    // console.log(response.data);
                    setcategoryData(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
        <div className="container mt-3">
            <h3 className="pb-1 mb-4">
                All Categories
            </h3>
            <div className="row mb-4">
            {categoryData && categoryData.map((row,index)=>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <Link to={`/course/${row.id}/${row.title}`}>{row.title} ({row.total_courses})</Link>
                            </h5>
                            <p className="card-text">{row.description}</p>
                        </div>
                    </div>
                </div>
                )}
            </div>

            {/* End Latest Courses */}
            {/* pagination start */}
            {/* <nav aria-label="Page navigation example mt-5">
                <ul class="pagination justify-content-center">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav> */}
            {/* End pagination */}
        </div>
    );
}

export default Category;