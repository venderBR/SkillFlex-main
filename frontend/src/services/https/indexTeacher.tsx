import { TeachersInterface } from "../../../interfaces/ITeacher";
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

async function GetTeacherByEmail(email: String | undefined) {
    const requestOptions = {
        method: "GET"
        };
    
        let res = await fetch(`${apiUrl}/loginteacher/${email}`, requestOptions)
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


export {
    GetUsers,
    GetGenders,
    DeleteUserByID,
    GetUserById,
    GetTeachers,
    CreateTeacher,
    DeleteTeacherByID,
    GetTeacherById,
    UpdateTeacher,
    GetTeacherByEmail
};
