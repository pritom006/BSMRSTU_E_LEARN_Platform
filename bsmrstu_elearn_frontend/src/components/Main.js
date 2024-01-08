import Header from './Header';
import Home from './Homes';
import About from './About';
import Footer from './Footer';
import CourseDetail from './CourseDetail';
import TeacherDetail from './TeacherDetail';

import {Routes as Switch,Route} from 'react-router-dom';

// User Pannel
import Login from './User/Login';
import Register from './User/Register';
import Dashboard from './User/Dashboard';
import TeacherDashboard from './Teacher/TeacherDashboard';
import MyCourses from './User/MyCourses';
import FavouriteCourses from './User/FavouriteCourses';
import RecommendedCourses from './User/RecommendedCourses';
import ProfileSetting from './User/ProfileSetting';
import ChangePassword from './User/ChangePassword';

// Instructor Pannel
import TeacherLogin from './Teacher/TeacherLogin';
import TeacherRegister from './Teacher/TeacherRegister';
import TeacherSidebar from './Teacher/TeacherSidebar';
import TeacherMyCourses from './Teacher/TeacherMyCourses';
import AddCourses from './Teacher/AddCourses';
import TeacherUser from './Teacher/TeacherUser';
import TeacherProfileSetting from './Teacher/TeacherProfileSetting';
import TeacherChangePassword from './Teacher/TeacherChangePassword';

// Course List
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import PopularTeachers from './PopularTeachers';
import CategoryCourses from './CategoryCourses';
import TeacherLogout from './Teacher/TeacherLogout';
import AddChapter from './Teacher/AddChapter';
import CourseChapters from './Teacher/CourseChapters';
import EditChapter from './Teacher/EditChapter';
import EditCourse from './Teacher/EditCourse';
import TeacherSkillCourses from './TeacherSkillCourses';
import StudentLogout from './User/StudentLogout';
import EnrolledStudents from './Teacher/EnrolledStudents';
import AddAssignment from './Teacher/AddAssignment';
import ShowAssignment from './Teacher/ShowAssignment';
import StudentAssignments from './User/StudentAssignments';
import Search from './Search';
import AddQuiz from './Teacher/AddQuiz';
import AllQuiz from './Teacher/AllQuiz';
import EditQuiz from './Teacher/EditQuiz';
import QuizQuestion from './Teacher/QuizQuestion';
import AddQuizQuestion from './Teacher/AddQuizQuestion';
import AssignQuiz from './Teacher/AssignQuiz';
import CourseQuizList from './User/CourseQuizList';
import TakeQuiz from './User/TakeQuiz';
import StudyMaterials from './Teacher/StudyMaterials';
import AddStudyMaterial from './Teacher/AddStudyMaterial';
import UserStudyMaterials from './User/UserStudyMaterials';
import AttemptedStudents from './Teacher/AttemptedStudents';
import Category from './Category';

function Main() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:course_id/" element={<CourseDetail />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-logout" element={<StudentLogout />} />
        <Route path="/user-register" element={<Register />} />
        <Route path="/user-dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/search/:searchstring" element={<Search />} />
        <Route path="/favourite-courses" element={<FavouriteCourses />} />
        <Route path="/recommended-courses" element={<RecommendedCourses />} />
        <Route path="/profile-setting" element={<ProfileSetting />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-logout" element={<TeacherLogout />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/teacher-sidebar" element={<TeacherSidebar />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-my-courses" element={<TeacherMyCourses />} />
        <Route path="/add-courses" element={<AddCourses />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
        <Route path="/quiz" element={<AllQuiz />} />
        <Route path="/edit-quiz/:quiz_id" element={<EditQuiz />} />
        <Route path="/all-questions/:quiz_id" element={<QuizQuestion />} />
        <Route path="/add-quiz-question/:quiz_id" element={<AddQuizQuestion />} />
        <Route path="/assign-quiz/:course_id" element={<AssignQuiz />} />
        <Route path="/attempted-students/:quiz_id" element={<AttemptedStudents />} />
        <Route path="/course-quiz/:course_id" element={<CourseQuizList />} />
        <Route path="/take-quiz/:quiz_id" element={<TakeQuiz />} />
        <Route path="/user/study-materials/:course_id" element={<UserStudyMaterials />} />
        <Route path="/study-materials/:course_id" element={<StudyMaterials />} />
        <Route path="/add-study/:course_id" element={<AddStudyMaterial />} />
        {/* <Route path="/edit-study/:study_id" element={<StudyMaterials />} /> */}
        <Route path="/add-chapter/:course_id" element={<AddChapter />} />
        <Route path="/add-assignment/:student_id/:teacher_id" element={<AddAssignment />} />
        <Route path="/show-assignment/:student_id/:teacher_id" element={<ShowAssignment />} />
        <Route path="/my-assignments/" element={<StudentAssignments />} />
        <Route path="/teacher-users" element={<TeacherUser />} />
        <Route path="/teacher-change-password" element={<TeacherChangePassword />} />
        <Route path="/teacher-profile-setting" element={<TeacherProfileSetting />} />
        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />
        <Route path="/enrolled-students/:course_id" element={<EnrolledStudents />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/all-chapters/:course_id" element={<CourseChapters />} />
        <Route path="/edit-chapter/:chapter_id" element={<EditChapter />} />
        <Route path="/edit-course/:course_id" element={<EditCourse />} />
        <Route path="/popular-courses" element={<PopularCourses />} />
        <Route path="/popular-teacher" element={<PopularTeachers />} />
        <Route path="/category" element={<Category />} />
        <Route path="/course/:category_id/:category_slug" element={<CategoryCourses />} />
        <Route path="/teacher-skill-courses/:skill_name/:teacher_id" element={<TeacherSkillCourses />} />
      </Switch>     
      <Footer />
    </div>
  );
}

export default Main;
