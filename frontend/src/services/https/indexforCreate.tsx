
import { TeachersInterface } from "../../../interfaces/ITeacher";
import { CoursesInterface } from "../../../interfaces/course";
import { UnitsInterface } from "../../../interfaces/IUnitCreate";
import { MaterialInterface } from "../../../interfaces/IMaterialCreate";
const apiUrl = "http://localhost:8080";

async function GetCategory() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/categorys`, requestOptions)
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

async function GetCourseById(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/course/${id}`, requestOptions)
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

async function GetTeacherById(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/teacher/${id}`, requestOptions)
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


async function CreateCourse(data: CoursesInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/courses`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;  
}

async function CreateUnit(data: UnitsInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/units`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;  
}

async function GetLatestUnit(id: Number | undefined) {
  const requestOptions = {
      method: "GET"
      };
  
      let res = await fetch(`${apiUrl}/unit_lastest/${id}`, requestOptions)
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

async function GetLatestCourse(id: Number | undefined) {
  const requestOptions = {
      method: "GET"
      };
  
      let res = await fetch(`${apiUrl}/course_lastest/${id}`, requestOptions)
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

async function CreateMaterial(data: MaterialInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/materials`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;  
}

async function CoursesInfoByID(id: Number | undefined) {
  const requestOptions = {
      method: "GET"
      };
  
      let res = await fetch(`${apiUrl}/coursesInfo/${id}`, requestOptions)
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

async function CoursesInfoByIDstudents(id: Number | undefined) {
  const requestOptions = {
      method: "GET"
      };
  
      let res = await fetch(`${apiUrl}/coursesInfoStudents/${id}`, requestOptions)
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

async function CoursesInfoByIDunits(id: Number | undefined) {
  const requestOptions = {
      method: "GET"
      };
  
      let res = await fetch(`${apiUrl}/coursesInfo_units/${id}`, requestOptions)
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

async function CoursesInfoByIDmaterials(id: Number | undefined) {
  const requestOptions = {
      method: "GET"
      };
  
      let res = await fetch(`${apiUrl}/coursesInfo_materials/${id}`, requestOptions)
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

async function CoursesInfoByIDstatus(id: Number | undefined) {
  const requestOptions = {
      method: "GET"
      };
  
      let res = await fetch(`${apiUrl}/coursesInfo_status/${id}`, requestOptions)
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

async function CoursesInfoByIDByApprove(id: Number | undefined) {
  const requestOptions = {
      method: "GET"
      };
  
      let res = await fetch(`${apiUrl}/coursesInfo_approve_description/${id}`, requestOptions)
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
  GetCourseById,
  GetTeacherById,
  CoursesInfoByID,
  CoursesInfoByIDstudents,
  CoursesInfoByIDmaterials,
  CoursesInfoByIDunits,
  CreateCourse,
  GetLatestCourse,
  CreateUnit,
  CreateMaterial,
  GetCategory,
  GetLatestUnit,
  CoursesInfoByIDstatus,
  CoursesInfoByIDByApprove
};
