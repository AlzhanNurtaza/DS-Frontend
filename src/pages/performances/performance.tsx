import React, { useState } from 'react'
import { Col, DatePicker, Row, Space, Switch, 
  Typography, theme,Grid } 
from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { useCustom, useGetLocale } from '@refinedev/core';
import { ExchangeCard } from '../../components/dashboard';


const {Text} = Typography; 
const { useToken } = theme;
const { useBreakpoint } = Grid;


const topColStyle = {
  xs: 24,
  sm:24,
  md:24,
  lg:9,
  xl:6,
  style:{
    width:'100%',
    display:'flex',
    paddingLeft:'5px',
    paddingRight:'5px'
  }
}



export const Performance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (date:any, dateString:string) => {
    console.log(dateString)
    setSelectedDate(dateString); 
  };


  const {data:currencyData,isLoading} = useCustom({
    url:'http://localhost:1337/api/currencies',
    method:'get',
    config: {
      sorters: [
        {
          field: "date",
          order: "desc",
        },
        
      ],
      filters: [
        {
          field: "currency",
          operator: "eq",
          value: "$",
        },
        {
          field: "currency",
          operator: "eq",
          value: "€",
        },
        {
          field: "currency",
          operator: "eq",
          value: "₽",
        },
      ],
      query: {
        pagination: {
          pageSize:3,
          page:1,
        },
        ...(selectedDate && { 'filters[date]': selectedDate }),
      },
    },
  });

  const { token } = useToken();
  const localing = useGetLocale();
  const currentLocale = localing();
  const breakpoints = useBreakpoint();
  

  return (
    <Row gutter={[24,12]} style={{ 
        display: 'flex', 
        alignContent:'flex-start',
        marginTop:breakpoints.xs ? '30px': '0'
      }} >
      <Col {...topColStyle} >
       
        <Space>
          <Text style={{color:token.colorWhite, fontSize:'small'}}>Без доли</Text>
          <Switch  style={{marginRight:'5px'}}/> 
          <Text style={{color:token.colorWhite, fontSize:'small'  }}>Дата</Text>
          <DatePicker locale={currentLocale !== 'en' ? locale : undefined} onChange={handleDateChange}/>
        </Space>
           
          
      </Col>
      <Col {...topColStyle}>
        <ExchangeCard 
          isLoading={isLoading}
          resource='currency'
          title="Котировки:"
          data={currencyData?.data?.data}
        />
      </Col>
      <Col {...topColStyle}>
        <ExchangeCard 
            isLoading={isLoading}
            resource='currency'
            title="Котировки:"
            data={currencyData?.data?.data}
          />
      </Col>
    </Row>
    
  )
}
