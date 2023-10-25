import { StudentInterface } from "../../../interfaces/IStudent";
const apiUrl = "http://localhost:8080";

async function GetUsers() {
    const requestOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};

let res = await fetch(`${apiUrl}/users`, requestOptions)
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

async function GetGenders() {
const requestOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};

let res = await fetch(`${apiUrl}/genders`, requestOptions)
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

async function DeleteUserByID(id: Number | undefined) {
    const requestOptions = {
    method: "DELETE"
};

let res = await fetch(`${apiUrl}/users/${id}`, requestOptions)
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

async function GetUserById(id: Number | undefined) {
const requestOptions = {
    method: "GET"
    };

    let res = await fetch(`${apiUrl}/user/${id}`, requestOptions)
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

async function GetStudentById(id: Number | undefined) {
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

async function GetStudentByEmail(email: String | undefined) {
    const requestOptions = {
        method: "GET"
        };
    
        let res = await fetch(`${apiUrl}/loginstudent/${email}`, requestOptions)
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

// async function CreateUser(data: UsersInterface) {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   };

//   let res = await fetch(`${apiUrl}/users`, requestOptions)
//     .then((response) => response.json())
//     .then((res) => {
//       if (res.data) {
//         return { status: true, message: res.data };
//       } else {
//         return { status: false, message: res.error };
//       }
//     });

//   return res;
// }

async function CreateStudent(data: StudentInterface) {
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



async function LoginByStudent(data: StudentInterface) { 
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(`${apiUrl}/loginStudent`, requestOptions);
        const res = await response.json();

        if (res.data) {
            return { status: true, message: res.data };
        } else {
            return { status: false, message: res.error };
        }
    } catch (error) {
        return { status: false, message: "An error occurred" };
    }
}

async function UpdateTeacher(data: StudentInterface) {
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


export {
    GetUsers,
    //   CreateUser,
    GetGenders,
    DeleteUserByID,
    GetUserById,
    LoginByStudent,
    GetStudents,
    CreateStudent,
    DeleteTeacherByID,
    GetStudentById,
    UpdateTeacher,
    GetStudentByEmail,
};
