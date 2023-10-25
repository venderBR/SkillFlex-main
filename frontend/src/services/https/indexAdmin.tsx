import { AdminsInterface } from "../../../interfaces/IAdmin";
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

async function GetAdmins() {
    const requestOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};

let res = await fetch(`${apiUrl}/admins`, requestOptions)
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

async function DeleteAdminByID(id: Number | undefined) {
const requestOptions = {
    method: "DELETE"
    };

    let res = await fetch(`${apiUrl}/admins/${id}`, requestOptions)
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

async function GetAdminById(id: Number | undefined) {
const requestOptions = {
    method: "GET"
    };

    let res = await fetch(`${apiUrl}/admin/${id}`, requestOptions)
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

async function GetAdminByEmail(email: String | undefined) {
    const requestOptions = {
        method: "GET"
        };
    
        let res = await fetch(`${apiUrl}/loginadmin/${email}`, requestOptions)
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

async function CreateAdmin(data: AdminsInterface) {
const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/admins`, requestOptions)
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

// async function UpdateUser(data: UsersInterface) {
//   const requestOptions = {
//     method: "PATCH",
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

async function UpdateAdmin(data: AdminsInterface) {
const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/admins`, requestOptions)
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
    //   UpdateUser,
    GetAdmins,
    CreateAdmin,
    DeleteAdminByID,
    GetAdminById,
    UpdateAdmin,
    GetAdminByEmail
};
