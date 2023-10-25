import { TeachersInterface } from "../../../interfaces/ITeacher";
import { StudentInterface } from "../../../interfaces/IStudent";
import { ApprovedCoursesInterface } from "../../../interfaces/approvedCourses";
const apiUrl = "http://localhost:8080";


async function GetTeachers() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/teachers`, requestOptions)
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

async function DeleteTeacherByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/teachers/${id}`, requestOptions)
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


async function CreateTeacher(data: TeachersInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/teachers`, requestOptions)
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

async function UpdateTeacher(data: TeachersInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/teachers`, requestOptions)
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


async function GetStudents() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/students`, requestOptions)
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
async function DeleteStudentsByID(id: Number  | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/students/${id}`, requestOptions)
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


async function GetStudentsById(id: number |null) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/student/${id}`, requestOptions)
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


async function CreateStudents(data: StudentInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/students`, requestOptions)
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

async function UpdateStudents(data: StudentInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/students`, requestOptions)
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
async function UpdateStudentsById(id: number | undefined, data: StudentInterface) {
  // สร้างออบเจ็กต์ใหม่ที่มีเฉพาะข้อมูลที่ต้องการอัปเดต
  const updateData = {
    FirstName: data.FirstName,
    LastName: data.LastName,
    Infomation: data.Infomation,
    Background_Pic: data.Background_Pic,
    Profile_Pic: data.Profile_Pic,
  };
   
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData), // ส่งเฉพาะข้อมูลที่ต้องการอัปเดต
  };

  try {
    const response = await fetch(`${apiUrl}/students/${id}`, requestOptions);
    const res = await response.json();

    if (res.data) {
      return { status: true, message: res.data };
    } else {
      return { status: false, message: res.error };
    }
  } catch (error : any) {
    return { status: false, message: error.message };
  }
}
async function UpdateTeachersById(id: number | undefined, data: TeachersInterface) {
  // สร้างออบเจ็กต์ใหม่ที่มีเฉพาะข้อมูลที่ต้องการอัปเดต
  const updateData = {
    FirstName: data.FirstName,
    LastName: data.LastName,
    Infomation: data.Infomation,
    Background_Pic: data.Background_Pic,
    Profile_Pic: data.Profile_Pic,
  };

  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData), // ส่งเฉพาะข้อมูลที่ต้องการอัปเดต
  };

  try {
    const response = await fetch(`${apiUrl}/teachers/${id}`, requestOptions);
    const res = await response.json();

    if (res.data) {
      return { status: true, message: res.data };
    } else {
      return { status: false, message: res.error };
    }
  } catch (error : any) {
    return { status: false, message: error.message };
  }
}

async function GetApprovedCourses() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/approvedCoursess`, requestOptions)
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
  async function GetApprovedCoursesByID(teacherid: number ) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/approvedCoursemain/${teacherid}`, requestOptions)
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
  async function GetDisapprovedCoursesByID(teacherid: number ) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/unapprovedCoursemain/${teacherid}`, requestOptions)
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
  async function GetEnroll() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/enroll`, requestOptions)
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
  async function GetEnrollByID(studentid: number ) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/enroll/${studentid}`, requestOptions)
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
  GetTeachers,
  CreateTeacher,
  DeleteTeacherByID,
  GetTeacherById,
  UpdateTeacher,
  GetStudents,
  CreateStudents,
  DeleteStudentsByID,
  GetStudentsById,
  UpdateStudents,
  UpdateStudentsById,
  UpdateTeachersById,
  GetApprovedCourses,
  GetApprovedCoursesByID,
  GetEnroll,
  GetEnrollByID,
  GetDisapprovedCoursesByID,
};
