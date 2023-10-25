import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import VideoPlayer from "./videoPlayer";
import { useParams } from "react-router-dom";
import { GetMaterialByUnitId } from "../../services/https/sMaterial";
import { getMaterialInterface } from "../../../interfaces/IMaterial";

interface Unit{
    unitid: string
}

const MaterialPage: React.FC<Unit> = ({unitid}) => {
    const [matrialData, setMateriaData] = useState<getMaterialInterface[]>([])

    const GetMaterialByUnitID = async () => {
        let res = await GetMaterialByUnitId(Number(unitid));
        if (res) {
          console.log("Fetched material successful\n");
          setMateriaData(res);
          console.log(matrialData);
          console.log("id = " + unitid)
        }
      }
    
      useEffect(() => {
        GetMaterialByUnitID();
      }, [unitid]);

    return(
        <Content style={{ padding: '0 50px', minHeight: 280, paddingBottom: 245 }}>
            {matrialData.map((item) => (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <p style={{paddingRight: '795px'}}>
                        {item.Description}</p>
                <VideoPlayer videoPath={item.VideoPath} />
            </div>
            
            ))}
        </Content>
    );
}

export default MaterialPage;
