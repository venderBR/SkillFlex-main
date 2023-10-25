const apiUrl = "http://localhost:8080";

async function GetMaterialByUnitId(id: Number | undefined) {
    const requestOptions = {
      method: "GET"
    };
  
    let res = await fetch(`${apiUrl}/material/${id}`, requestOptions)
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

  export {GetMaterialByUnitId};