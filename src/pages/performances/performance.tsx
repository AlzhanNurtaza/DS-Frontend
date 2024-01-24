import React from 'react'
import { Col, DatePicker, Row, Space, Switch, Typography, theme } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { useGetLocale } from '@refinedev/core';

const {Text} = Typography; 
const { useToken } = theme;


const topColStyle = {
  xs: 24,
  sm:24,
  md:8
}


export const Performance: React.FC = () => {
  const { token } = useToken();
  const localing = useGetLocale();
  const currentLocale = localing();

  return (
    <Row gutter={24} style={{ display: 'flex'}}>
      <Col {...topColStyle} >
      <Space direction="horizontal">
        <Text style={{color:token.colorWhite}}>Без доли</Text>
        <Switch />
        <Text style={{color:token.colorWhite}}>Дата</Text>
        {
            currentLocale === 'en' 
            ? <DatePicker /> 
            : <DatePicker locale={locale} />
        }
        </Space>
      </Col>
      <Col {...topColStyle}>
        ExchangeRate
      </Col>
      <Col {...topColStyle}>
        ExchangeRate
      </Col>
    </Row>
    
  )
}
