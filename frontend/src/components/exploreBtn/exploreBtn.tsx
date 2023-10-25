import './exploreBtn.css'
import { Space, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CategorysInterface } from '../../../interfaces/ICategory';
import GetCategory from '../../services/https/sCategory';


function ExploreBtn(){
    const [category, setCategoryData] = useState<CategorysInterface[]>([]);
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = ({ key }) => {
        navigate(`/search?query=${key}`);
      };

    
    const getCategory = async () => {
        let res = await GetCategory(); 
        if (!Array.isArray(res)) {
            res = [res];
        }
        setCategoryData(res);
        console.log(res)
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            type: 'group',
            label: 'Catagory',
            children: category.map((item) => ({
                label: item?.Name || 'DefaultLabel',
            key: item?.Name || 'DefaultKey',
            })),
        },
    ];

    useEffect(() => {
        getCategory(); 
    }, [])
    console.log(category);

    return(
        <Dropdown menu={{ items, onClick }}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space className='explore'>
                        Explore
                    </Space>
                </a>
            </Dropdown>
    );
}

export default ExploreBtn;