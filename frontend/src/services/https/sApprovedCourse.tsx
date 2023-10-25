const apiUrl = "http://localhost:8080";

async function GetApprovedCourses() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/approvedCourses`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

async function GetApprovedCourseById(id: Number | undefined) {
    const requestOptions = {
      method: "GET"
    };
  
    let res = await fetch(`${apiUrl}/approvedCourse/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

  export {
    GetApprovedCourses,
    GetApprovedCourseById
  };