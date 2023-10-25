// SearchPage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { List, Card, Radio, Space, Divider } from 'antd';
import NavBar from '../../components/navBar/navBar';
import Meta from 'antd/es/card/Meta';
import { ApprovedCourseInterface } from '../../../interfaces/IApprovedcourse';
import { CategorysInterface } from '../../../interfaces/ICategory';
import GetCategory from '../../services/https/sCategory';

const SearchPage: React.FC<{courseData: ApprovedCourseInterface[]}> = ({courseData}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ApprovedCourseInterface[]>([]);
  const [filterTerm, setFilterTerm] = useState<string>('');
  const [searchParams] = useSearchParams();
  const [category, setCategoryData] = useState<CategorysInterface[]>([]);

  useEffect(() => {
    const query = searchParams.get('query') || '';
    setSearchTerm(query);
    handleSearch(query, filterTerm);
  }, [searchParams, filterTerm]);

  const handleSearch = (value: string, filter: string) => {
    const lowerCaseValue = value.toLowerCase();
    const lowerCaseFilter = filter.toLowerCase();
    const results = courseData.filter(item => item.Name?.toLowerCase().includes(lowerCaseValue)
    && item.Name.toLowerCase().includes(lowerCaseFilter) || item.Category_ID?.toString().toLowerCase().includes(lowerCaseValue)
    && item.Category_ID.toString().toLowerCase().includes(lowerCaseFilter)
    );
    setSearchResults(results);
  };

  const onMenuClick = (courseid: string) => {
    navigate(`/courseDashboard/${courseid}`);
  };

  const sliceDesc = (desc?: string) => {
    let text = desc;
    if(text !== undefined){
      if(text.length > 50){
        text = text.substring(0, 40) + "..."
      }
      return(text);
    }
    else return("")
  }
  
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
      <NavBar currentPage="search" />
      <Space align='start' size={'large'}>
      <div style={{width: '200px', padding: '50px', marginLeft: '80px'}}>
          <h3>Filter:</h3>
          <Radio.Group onChange={(e) => setFilterTerm(e.target.value)} value={filterTerm || searchTerm}>
            <Space direction="vertical">
            {category.map((item) => (
              <Radio key={item.ID} value={item.ID?.toString()}>
                {item.Name}
              </Radio>
            ))}
            </Space>
          </Radio.Group>
        </div>
        <Divider type="vertical" />
        <div style={{width: '1000px', padding: '50px'}}>
        <Space direction='horizontal' size={600}>
          <h3>Search Results for "{searchTerm}"</h3>
          <h4>Found {searchResults.length} results</h4>
        </Space>
        
        <List
              grid={{ gutter: 100, column: 4 }}
              dataSource={searchResults}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    onClick={() => onMenuClick(String(item.ID))}
                    hoverable
                    style={{ width: 240, margin: "20px"}}
                    cover={<img  src= {item.Image} style={{height: 280,objectFit: "cover"}}/>}
                    >
                    <Meta title={item.Name} description= {sliceDesc(item.Description)} />
                  </Card>
                </List.Item>
              )}
            />
        </div>
      </Space>
        
    </div>
  );
};

export default SearchPage;