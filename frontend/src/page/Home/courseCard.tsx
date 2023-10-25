import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { useNavigate,} from "react-router-dom";
import  image from '../../assets/image.jpg' 
import { ApprovedCourseInterface } from "../../../interfaces/IApprovedcourse";
import { GetApprovedCourses } from "../../services/https/sApprovedCourse";
import Carousel from "react-multi-carousel";



  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };



const CourseCard: React.FC<{courseData: ApprovedCourseInterface[]}> = ({courseData}) => {
    const navigate = useNavigate();
    const onMenuClick = (courseid: string) => {
        navigate(`/courseDashboard/${courseid}`);
    };
    
    const sliceDesc = (desc: string) => {
      let text = "";
      if(desc.length > 50){
        text = desc.substring(0, 40) + "..."
      }
      else text = desc;
      return(text);
    }

    const renderCourseCards = courseData.slice(0,7).map((item) => (
          <Card
              key={item.ID}
              onClick={() => onMenuClick(String(item.ID))}
              hoverable
              style={{ width: 240, margin: "20px" }}
              cover={<img src={item.Image} style={{ height: 280, objectFit: "cover" }} />}
              >
              <Meta title={item.Name} description={sliceDesc(String(item.Description))} />
          </Card>
    ));
    
    return (
          <Carousel responsive={responsive} >
            {renderCourseCards}
          </Carousel>
    );
};

export {CourseCard};