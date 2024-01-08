import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [seachString, setseachString] = useState({
    'search':''
  });
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
  const studentLoginStatus = localStorage.getItem('studentLoginStatus');

  const handleChange=(event) => {
    setseachString({
      ...seachString,
      [event.target.name]:event.target.value
    });
  }

  const searchCourse = () => {
    if(seachString.search!=''){
      window.location.href='/search/'+seachString.search
    }
    
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">BSMRSTU E-learn-platform</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <form className="d-flex" role="search">
          <input name='search' onChange={handleChange} className="form-control me-2" type="search" placeholder="Search by course title" aria-label="Search" />
          <button className="btn btn-warning" onClick={searchCourse} type="button">Search</button>
        </form>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            <Link className='nav-link' to="/category">Categories</Link>
            <Link className="nav-link" to="/all-courses">Courses</Link>
            <li class="nav-item dropdown">
              <Link class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Instructor
              </Link>
              <ul className="dropdown-menu" aria-labelledby='navbarDropdown'>
                {teacherLoginStatus !== 'true' &&
                  <>
                    <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
                    <li><Link className="dropdown-item" to="/teacher-register">Register</Link></li></>
                }
                {teacherLoginStatus === 'true' &&
                  <>
                    <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li></>
                }
              </ul>
            </li>

            <li class="nav-item dropdown">
              <Link class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                User
              </Link>
              <ul className="dropdown-menu">
                {studentLoginStatus !== 'true' &&
                  <>
                    <li><Link className="dropdown-item" to="/user-login">Login</Link></li>
                    <Link className="dropdown-item" to="/user-register">Register</Link></>
                }
                {studentLoginStatus === 'true' &&
                  <>
                    <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                    <li><Link className="dropdown-item" to="/user-logout">Logout</Link></li></>
                }
              </ul>
            </li>
            {/* <Link className="nav-link" to="/about">About Us</Link> */}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;