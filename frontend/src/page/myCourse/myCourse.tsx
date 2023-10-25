import React from "react";
import NavBar from "../../components/navBar/navBar";

const MyCourse: React.FC = () => {
    return(
        <div>
            <NavBar currentPage="myCourse" />
            <p>My Course</p>
        </div>
    );
}

export default MyCourse;