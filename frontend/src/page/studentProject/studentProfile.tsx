import NavBar from "../../components/navBar/navBar";

const StudentProfile: React.FC = () => {
    return(
        <div>
            <NavBar currentPage="profile" />
            <p>Student Profile</p>
        </div>
    );
}

export default StudentProfile;