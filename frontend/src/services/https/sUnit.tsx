const apiUrl = "http://localhost:8080";

async function GetUnits() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/units`, requestOptions)
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

async function GetUnitByCourseId(id: Number | undefined) {
    const requestOptions = {
      method: "GET"
    };
  
    let res = await fetch(`${apiUrl}/units/${id}`, requestOptions)
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
    GetUnits,
    GetUnitByCourseId
  };