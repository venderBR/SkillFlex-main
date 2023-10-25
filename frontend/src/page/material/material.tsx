import React, { useEffect, useState } from 'react';
import { Menu, Divider, Layout, MenuProps } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../components/navBar/navBar';
import VideoPlayer from './videoPlayer';
import { GetUnitByCourseId } from '../../services/https/sUnit';
import { getUnitInterface } from '../../../interfaces/IUnit';
import MaterialPage from './materialPage';

const { Content, Sider } = Layout;

const Material: React.FC = () => {
  const { courseId } = useParams();
  const [unitData, setUnitData] = useState<getUnitInterface[]>([]);
  const navigate = useNavigate();
  const [selectedUnitId, setSelectedUnitId] = useState<string>("");

  const item: MenuProps['items'] = unitData.map(
    (unit) => {
      const key = String(unit.Order);
      return {
        key: `${key}`,
        label: `Unit ${key}`,
        onClick: () => GoMaterialPage(unit.ID?.toString()),
      };
    },
  );

  const GetUnitByCId = async () => {
    let res = await GetUnitByCourseId(Number(courseId));
    if (res) {
      console.log("Fetched unit successful\n");
      setUnitData(res);
      console.log(unitData);
    }
  }

  useEffect(() => {
    GetUnitByCId();
    
    
  }, []);

  const GoMaterialPage = (unitId?: string) => {
    if(unitId !== undefined){
      setSelectedUnitId(unitId)
      console.log("unitid=" + unitId)
    }
  };

  return (
    <div>
    <NavBar currentPage="material" />
    <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0', background: 'white' }}>
          <Sider style={{ background: 'black' }} width={300}>
            <Menu
              mode="inline"
              
              style={{ height: '100%' }}
              items={item}
            />
          </Sider>
          <Divider type="vertical" />
          <MaterialPage unitid={selectedUnitId}/>
        </Layout>
      </Content>
  </div>
  );
};

export default Material;
