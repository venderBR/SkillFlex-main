import { EnrollmentInterface } from "../../../interfaces/IEnrollment";

const apiUrl = "http://localhost:8080";

async function CreateEnrollment(data: EnrollmentInterface) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/createEnrollment`, requestOptions)
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

async function GetEnrollments() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/enrollments`, requestOptions)
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

async function CheckEnrollment(courseid: string | undefined, studentid: string | undefined) {
    const requestOptions = {
      method: "GET"
    };
  
    let res = await fetch(`${apiUrl}/checkEnrollment/${courseid}/${studentid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data.length > 0) {
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }

async function DeleteEnrollmentByID(id: Number | undefined) {
    const requestOptions = {
      method: "DELETE"
    };
  
    let res = await fetch(`${apiUrl}/delEnrollments/:id/${id}`, requestOptions)
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
    CreateEnrollment,
    GetEnrollments,
    CheckEnrollment,
    DeleteEnrollmentByID
  };