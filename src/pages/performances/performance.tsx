import React, { useState } from 'react'
import { Col, DatePicker, Row, Space, Switch, 
  Typography, theme } 
from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { useCustom, useGetLocale, useTranslate } from '@refinedev/core';
import { ExchangeCard,KpiCard,PurchaseColumnChart,TabComponentChart} from '../../components/dashboard';
import './styles.css';

import { API_URL } from "../../constants";
import { ProCard } from '@ant-design/pro-components';


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
const ColStyleRow2 = {
  xs: 24,
  sm:24,
  md:24,
  lg:12,
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
  const {data:oilRefiningData,isLoading:isLoadingORD} = useCustom({
    url:`${API_URL}/api/annual-oil-refinings`,
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
  const {data:oilRefiningDailyData,isLoading:isLoadingDailyORD} = useCustom({
    url:`${API_URL}/api/daily-oil-refinings`,
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

  const {data:oilTransportationData,isLoading:isLoadingOTD} = useCustom({
    url:`${API_URL}/api/annual-oil-transportations`,
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
  const {data:oilTransportationDailyData,isLoading:isLoadingDailyOTD} = useCustom({
    url:`${API_URL}/api/daily-oil-transportations`,
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
  const {data:DepositData,isLoading:isLoadingDeposit} = useCustom({
    url:`${API_URL}/api/deposits`,
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
  const {data:DepositDailyData,isLoading:isLoadingDailyDeposit} = useCustom({
    url:`${API_URL}/api/quaterly-deposits`,
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
        ...(
          selectedDate ? 
          { 
            filters: {
              date: {
                $lte: selectedDate 
              }
            }
          } : {}
        )
      },
    },
  });
  const {data:IncomeData,isLoading:isLoadingIncome} = useCustom({
    url:`${API_URL}/api/incomes`,
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
  const {data:IncomeDailyData,isLoading:isLoadingDailyIncome} = useCustom({
    url:`${API_URL}/api/quarterly-incomes`,
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
        ...(
          selectedDate ? 
          { 
            filters: {
              date: {
                $lte: selectedDate 
              }
            }
          } : {}
        )
      },
    },
  });
  const {data:PurchaseData,isLoading:isLoadingPurchase} = useCustom({
    url:`${API_URL}/api/purchases`,
    method:'get',
    config: {
      sorters: [
        {
          field: "year",
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
            data={oilProductionData?.data?.data }
            dataDaily={oilProductionDailyData?.data?.data}
            isLoadingDaily={isLoadingDailyOPD}
            isDolya={dolya}
            selectedDate={selectedDate}
          />
        </Col>
        <Col {...ColStyle}>
        <KpiCard 
            resource='OilRefining'
            headerTitle={translate("performance.OilRefining", "Переработка нефти")}
            subTitle={translate("performance.OilRefiningSubTitle", "(тыс.тонн)")}
            isLoading={isLoadingORD}
            data={oilRefiningData?.data?.data }
            dataDaily={oilRefiningDailyData?.data?.data}
            isLoadingDaily={isLoadingDailyORD}
            isDolya={dolya}
            selectedDate={selectedDate}
          />
        </Col>
        <Col {...ColStyle}>
        <KpiCard 
            resource='OilTransportation'
            headerTitle={translate("performance.OilTransportation", "Транспортировка нефти")}
            subTitle={translate("performance.OilTransportationSubTitle", "(тыс.тонн)")}
            isLoading={isLoadingOTD}
            data={oilTransportationData?.data?.data }
            dataDaily={oilTransportationDailyData?.data?.data}
            isLoadingDaily={isLoadingDailyOTD}
            isDolya={dolya}
            selectedDate={selectedDate}
          />
        </Col>
        <Col {...ColStyle}>
          <ProCard
          boxShadow
          style={{
            width:'100%',
            padding:0,
            
          }}
          bodyStyle={{
            padding:0,
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',height:'100%'
          }}
          
          >
            <KpiCard      
              resource='Money'
              headerTitle={translate("performance.Money", "Денежные средства")}
              subTitle={translate("performance.MoneySubTitle", "(млрд.)")}
              isLoading={isLoadingDeposit}
              isLoadingDaily={isLoadingDailyDeposit}
              data={DepositData?.data.data}
              dataDaily={DepositDailyData?.data?.data}
              isShort={true}
              selectedDate={selectedDate}
            />
            <KpiCard      
              resource='Income'
              headerTitle={translate("performance.Income", "Денежные средства")}
              subTitle={translate("performance.IncomeSubTitle", "(млрд.)")}
              isLoading={isLoadingIncome}
              isLoadingDaily={isLoadingDailyIncome}
              data={IncomeData?.data.data}
              dataDaily={IncomeDailyData?.data?.data}
              isShort={true}
              selectedDate={selectedDate}
            />
          </ProCard>
        </Col>
      </Row>
      <Row gutter={[24,12]} style={{ 
          display: 'flex',
        }}
      >
        <Col {...ColStyleRow2}>
          <TabComponentChart 
            data1={selectedDate ? oilProductionDailyData?.data?.data: oilProductionData?.data?.data}
            data2={selectedDate ? oilRefiningDailyData?.data?.data: oilRefiningData?.data?.data}
            data3={selectedDate ? oilTransportationDailyData?.data?.data: oilTransportationData?.data?.data}
            isLoading={isLoadingDailyOPD}
            isDolya={dolya}
          />
        </Col>
        <Col {...ColStyleRow2}>
          <div style={{
            width:'100%'
          }}>
            <PurchaseColumnChart 
              isLoading={isLoadingPurchase}
              data={PurchaseData?.data?.data}
            />
          </div>

        </Col>
      </Row>
    </>
  )
}
