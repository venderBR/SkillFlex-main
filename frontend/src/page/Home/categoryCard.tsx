import { Card, List } from "antd";
import { useEffect, useState } from "react";
import { useNavigate,} from "react-router-dom";
import { CategorysInterface } from "../../../interfaces/ICategory";
import GetCategory from "../../services/https/sCategory";


function CategoryCard() {
    const [category, setCategoryData] = useState<CategorysInterface[]>([]);
    const navigate = useNavigate();

    const onMenuClick = (category: string | undefined) => {
        if(category !== undefined){
            navigate(`/search?query=${category}`);
        }
        
    }

    const gridStyle: React.CSSProperties = {
        width:'200px',
        textAlign: 'center'
      };

    const getCategory = async () => {
        let res = await GetCategory(); 
        if (!Array.isArray(res)) {
            res = [res];
        }
        setCategoryData(res);
        console.log(res)
    }

    useEffect(() => {
        getCategory(); 
    }, [])
    console.log(category);
    
    return (
        <div>
            <Card >
            <List
                grid={{
                    gutter: 10,
                    xxl: 6
                    }}
                dataSource={category}
                renderItem={(item) => (
                <List.Item>
                    <Card.Grid key={item.Name} onClick={() => onMenuClick(item.ID?.toString())} style={gridStyle}>{item.Name}</Card.Grid>
                </List.Item>
                )}
            />
            </Card>
        </div>
    );
}

export { CategoryCard };