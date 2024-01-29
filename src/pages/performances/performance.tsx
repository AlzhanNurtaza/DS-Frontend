import React, { useState } from 'react'
import { Col, DatePicker, Row, Space, Switch, 
  Typography, theme } 
from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { useCustom, useGetLocale, useTranslate } from '@refinedev/core';
import { ExchangeCard,KpiCard } from '../../components/dashboard';
import './styles.css';

import { API_URL } from "../../constants";


const {Text} = Typography; 
const { useToken } = theme;

const topColStyle = {
  xs: 24,
  sm:24,
  md:12,
  lg:12,
  xl:8,
  style:{
    width:'100%',
    display:'flex',
    paddingLeft:'5px',
    paddingRight:'5px',
  }
}

const ColStyle = {
  xs: 24,
  sm:24,
  md:12,
  lg:6,
  style:{
    marginTop:24,
    width:'100%',
    display:'flex'
  }
}


export const Performance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [dolya, setDolya] = useState(false);

  const translate = useTranslate();

  const handleDateChange = (date:any, dateString:string) => {
    setSelectedDate(dateString); 
  };


  const {data:currencyData,isLoading} = useCustom({
    url:`${API_URL}/api/currencies`,
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

  const {data:shareData,isLoading:isLoadingShare} = useCustom({
    url:`${API_URL}/api/shares`,
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
          field: "title",
          operator: "eq",
          value: "КМГ,AIX",
        },
        {
          field: "title",
          operator: "eq",
          value: "КМГ,KASE",
        }
      ],
      query: {
        pagination: {
          pageSize:2,
          page:1,
        },
        ...(selectedDate && { 'filters[date]': selectedDate }),
      },
    },
  });

  const {data:oilProductionData,isLoading:isLoadingOPD} = useCustom({
    url:`${API_URL}/api/annual-oil-productions`,
    method:'get',
    config: {
      sorters: [
        {
          field: "value",
          order: "desc",
        },
        
      ],
      query: {
        pagination: {
          pageSize:100,
          page:1,
        },
      },
    },
  });
  const {data:oilProductionDailyData,isLoading:isLoadingDailyOPD} = useCustom({
    url:`${API_URL}/api/daily-oil-productions`,
    method:'get',
    config: {
      sorters: [
        {
          field: "date",
          order: "desc",
        },
        
      ],
      query: {
        pagination: {
          pageSize:500,
          page:1,
        },
        ...(
          selectedDate ? 
          { 
            filters: {
              date: {
                $lte: selectedDate // Using Strapi's filtering syntax for 'less than or equal to'
              }
            }
          } : {}
        )
      },
    },
  });


  const { token } = useToken();
  const localing = useGetLocale();
  const currentLocale = localing();

  return (
    <>
      <Row gutter={[24,12]} style={{ 
          display: 'flex', 
          alignContent:'flex-start',
        }} className="row-margin-top" >
        <Col {...topColStyle}  >
        
          <Space>
            <Text style={{color:token.colorWhite, fontSize:'small'}}>{translate("performance.dolya", "Без доли")}</Text>
            <Switch 
                style={{ marginRight: '5px' }}
                checked={dolya} 
                onChange={(checked) => setDolya(checked)} 
            />
            <Text style={{color:token.colorWhite, fontSize:'small'  }}>{translate("performance.date", "Дата")}</Text>
            <DatePicker locale={currentLocale !== 'en' ? locale : undefined} onChange={handleDateChange}/>
          </Space>
            
            
        </Col>
        <Col {...topColStyle}>
          <ExchangeCard 
            isLoading={isLoading}
            resource='currency'
            title={translate("performance.exchange", "Котировки")+ ":"}
            data={currencyData?.data?.data}
          />
        </Col>
        <Col {...topColStyle}>
          <ExchangeCard 
              isLoading={isLoadingShare}
              resource='share'
              title={translate("performance.shares", "Акции")+ ":"}
              data={shareData?.data?.data}
            />
        </Col>
      </Row>
      <Row gutter={[24,12]}
        style={{ 
          display: 'flex',
        }}
      >
        <Col {...ColStyle}>
          <KpiCard 
            resource='OilProduction'
            headerTitle={translate("performance.OilProduction", "Добыча нефти")}
            subTitle={translate("performance.OilProductionSubTitle", "(тыс.тонн)")}
            isLoading={isLoadingOPD}
            data={selectedDate ? oilProductionDailyData?.data?.data: oilProductionData?.data?.data }
            dataDaily={oilProductionDailyData?.data?.data}
            isLoadingDaily={isLoadingDailyOPD}
            isDolya={dolya}
          />
        </Col>
        <Col {...ColStyle}>
          <KpiCard 
            resource='OilRefining'
            headerTitle='Переработка нефти'
            subTitle='(тыс.тонн)'
            isLoading={false}
            data={[]}
 
          />
        </Col>
        <Col {...ColStyle}>
          <KpiCard 
            resource='OilTransportation'
            headerTitle='Транспортировка нефти'
            subTitle='(тыс.тонн)'
            isLoading={false}
            data={[]}
                
          />
        </Col>
        <Col {...ColStyle}>
          <KpiCard 
            resource='Money'
            headerTitle='Деньги'
            subTitle='(тыс.тонн)'
            isLoading={false}
            data={[]}
          />
        </Col>
      </Row>
    </>
  )
}
