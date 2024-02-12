import React, { useEffect, useState } from 'react'
import { Col, DatePicker, Row, Space, Switch, 
  Typography, theme } 
from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { useCustom, useGetLocale, useTranslate } from '@refinedev/core';
import { ExchangeCard,KpiCard,KpiListCard,PurchaseColumnChart,TabComponentChart} from '../../components/dashboard';
import dayjs from 'dayjs';
import './styles.css';

import { API_URL } from "../../constants";
import { ProCard } from '@ant-design/pro-components';
//import { useApiData } from '../../hooks/useApiData';
import { useApiDataCustom } from '../../hooks/useApiDataCustom';


const {Text} = Typography; 
const { useToken } = theme;
const { RangePicker } = DatePicker;

const topColStyle = {
  xs: 24,
  sm:24,
  md:12,
  lg:12,
  xl:6,
  xxl:6,
  style:{
    width:'100%',
    display:'flex',
    paddingLeft:'5px',
    paddingRight:'5px',
    alignItems:'flex-end'
  }
}

const ColStyle = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 6,
  style:{
    marginTop:24,
    width:'100%',
    display:'flex'
  }
}
const Row2Col2Css: React.CSSProperties = {
  marginTop:24,
  width:'100%',
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between'
}
const ColStyleRow2 = {
  xs: 24,
  sm:24,
  md:24,
  lg:12,
  style:Row2Col2Css
}



export const Performance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [dolya, setDolya] = useState(false);

  const [startDateString, setStartDateString] = useState(dayjs().startOf('year').format('YYYY-MM-DD'));
  const [endDateString, setEndDateString] = useState(dayjs().format('YYYY-MM-DD'));

  const translate = useTranslate();

  const defaultDates = [dayjs().startOf('year'), dayjs()];
  const [dates, setDates] = useState<any>(defaultDates);
  const handleDatesChange:any = (dates:[], dateString:string) => {
    if(dateString[0]=='' || dateString[1]==''){
      setDates(defaultDates);
      setStartDateString(defaultDates[0].format('YYYY-MM-DD'))
      setEndDateString(defaultDates[1].format('YYYY-MM-DD'))
    }
    else {
      setDates(dates);
      setStartDateString(dateString[0])
      setEndDateString(dateString[1])
    }
  };

  //Курсы 
  const { data: currencyData, isLoading: isLoading } = useApiDataCustom('currencies', 
  {
    'sort[0]':'date:desc',
    'sort[1]':'currency:desc',
    'filters[currency][$eq][0]':'$',
    'filters[currency][$eq][1]':'€',
    'filters[currency][$eq][2]':'₽',
    'filters[date][$gte][0]':startDateString,
    'filters[date][$lte][1]':endDateString,
    "pagination[page]":1,
    "pagination[pageSize]":3,
  },[startDateString,endDateString],false);

  
  
  //Акции
  const { data: shareData, isLoading: isLoadingShare } = useApiDataCustom('shares', {
    'sort[0]':'date:desc',
    'filters[title][$eq][0]':'KMГ,AIX',
    'filters[title][$eq][1]':'КМГ,KASE',
    'filters[date][$gte][0]':startDateString,
    'filters[date][$lte][1]':endDateString,
    "pagination[page]":1,
    "pagination[pageSize]":2,
  }, [startDateString,endDateString],false); 


    //Brent
  const { data: brentData, isLoading: isLoadingbrentData } = useApiDataCustom('brents', {
      'sort[0]':'date:desc',
      //'filters[date][$gte][0]':startDateString,
      //'filters[date][$lte][1]':endDateString,
      "pagination[page]":1,
      "pagination[pageSize]":1,
  },[startDateString,endDateString],false);
    
  //Добыча
  const { data: oilProductionDailyData, isLoading: isLoadingDailyOPD } = useApiDataCustom('daily-oil-productions', {
    'sort[0]':'date:desc',
    'filters[date][$gte][0]':startDateString,
    'filters[date][$lte][1]':endDateString,
    "pagination[page]":1,
    "pagination[pageSize]":500,
  }, [startDateString,endDateString],true); 

  //Переработка
  const { data: oilRefiningDailyData, isLoading: isLoadingDailyORD } = useApiDataCustom('daily-oil-refinings', {
    'sort[0]':'date:desc',
    'filters[date][$gte][0]':startDateString,
    'filters[date][$lte][1]':endDateString,
    "pagination[page]":1,
    "pagination[pageSize]":500,
  }, [startDateString,endDateString],true); 

  //Транспортировка
  const { data: oilTransportationDailyData, isLoading: isLoadingDailyOTD } = useApiDataCustom('daily-oil-transportations', {
    'sort[0]':'date:desc',
    'filters[date][$gte][0]':startDateString,
    'filters[date][$lte][1]':endDateString,
    "pagination[page]":1,
    "pagination[pageSize]":500,
  }, [startDateString,endDateString],true); 

  //Деньги-----------------
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

  //Чистые доходы------------
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


  //Закупки
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

  //Инциденты
  const { data: IncidentData, isLoading: isLoadingIncident } = useApiDataCustom('daily-incidents', {
    'sort[0]':'date:desc',
    'filters[date][$gte][0]':startDateString,
    'filters[date][$lte][1]':endDateString,
    "pagination[page]":1,
    "pagination[pageSize]":500,
  }, [startDateString,endDateString],true); 


  //Несчастные случаи
  const { data: AccidentData, isLoading: isLoadingAccident } = useApiDataCustom('daily-accidents', {
    'sort[0]':'date:desc',
    'filters[date][$gte][0]':startDateString,
    'filters[date][$lte][1]':endDateString,
    "pagination[page]":1,
    "pagination[pageSize]":500,
  }, [startDateString,endDateString],true); 
  
  //ДТП
  const { data: DtpData, isLoading: isLoadingDtp } = useApiDataCustom('daily-dtps', {
    'sort[0]':'date:desc',
    'filters[date][$gte][0]':startDateString,
    'filters[date][$lte][1]':endDateString,
    "pagination[page]":1,
    "pagination[pageSize]":500,
  }, [startDateString,endDateString],true); 

  const [isLoadingGlobal, setIsLoadingGlobal] = useState(true);
  useEffect(() => {
    // Set global loading to false only if all individual loading states are false
    const anyLoading = isLoading || isLoadingShare || isLoadingbrentData || isLoadingDailyOPD || isLoadingDailyORD || isLoadingDailyOTD || isLoadingDeposit || isLoadingDailyDeposit || isLoadingIncome || isLoadingDailyIncome || isLoadingPurchase || isLoadingIncident || isLoadingAccident || isLoadingDtp;
  
    setIsLoadingGlobal(anyLoading);
  }, [
    isLoading, isLoadingShare, isLoadingbrentData, isLoadingDailyOPD, 
    isLoadingDailyORD, isLoadingDailyOTD, isLoadingDeposit, isLoadingDailyDeposit, 
    isLoadingIncome, isLoadingDailyIncome, isLoadingPurchase, isLoadingIncident, 
    isLoadingAccident, isLoadingDtp
  ]);


  
  


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
        
          <Space  direction="vertical" style={{ display: 'flex' }}>
            <Space>
            <Text style={{color:token.colorWhite, fontSize:'small'}}>{translate("performance.dolya", "Без доли")}</Text>
            <Switch 
                style={{ marginRight: '5px' }}
                checked={dolya} 
                onChange={(checked) => setDolya(checked)} 
            />
            </Space>
            <Space>
            <Text style={{color:token.colorWhite, fontSize:'small'  }}>{translate("performance.date", "Дата")}</Text>
            <RangePicker  
              locale={currentLocale !== 'en' ? locale : undefined}
              value={dates}
              onChange={handleDatesChange}
              style={{
                
              }}
            />
            </Space>


          </Space>
            
            
        </Col>
        <Col {...topColStyle}>
          <ExchangeCard 
            isLoading={isLoadingGlobal}
            resource='currency'
            title=""//{translate("performance.exchange", "Курсы валют")+ ":"}
            data={currencyData} 
          />

        </Col>
        <Col {...topColStyle}>
          <ExchangeCard 
              isLoading={isLoadingGlobal}
              resource='share'
              title=""//{translate("performance.shares", "Акции")+ ":"}
              data={shareData}
            />
        </Col>
        <Col {...topColStyle}>
        <ExchangeCard 
              isLoading={isLoadingGlobal}
              resource='share'
              title=""//{translate("performance.brent", "Platts, BRENT")+ ":"}
              data={brentData}
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
            isLoading={isLoadingGlobal}
            data={oilProductionDailyData }
            dataDaily={oilProductionDailyData}
            isDolya={dolya}
            selectedDate={selectedDate}
          />
        </Col>
        <Col {...ColStyle}>
        <KpiCard 
            resource='OilRefining'
            headerTitle={translate("performance.OilRefining", "Переработка нефти")}
            subTitle={translate("performance.OilRefiningSubTitle", "(тыс.тонн)")}
            isLoading={isLoadingGlobal}
            data={oilRefiningDailyData }
            isDolya={dolya}
          />
        </Col>
        <Col {...ColStyle}>
        <KpiCard 
            resource='OilTransportation'
            headerTitle={translate("performance.OilTransportation", "Транспортировка нефти")}
            subTitle={translate("performance.OilTransportationSubTitle", "(тыс.тонн)")}
            isLoading={isLoadingGlobal}
            data={oilTransportationDailyData}
            isDolya={dolya}
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
            gap:24,
            justifyContent:'space-between',height:'100%'
          }}
          
          >
            <KpiCard      
              resource='Money'
              headerTitle={translate("performance.Money", "Денежные средства")}
              subTitle={translate("performance.MoneySubTitle", "(млрд.)")}
              isLoading={isLoadingGlobal}
              //isLoadingDaily={isLoadingDailyDeposit}
              data={DepositData?.data.data}
              dataDaily={DepositDailyData?.data?.data}
              isShort={true}
              selectedDate={selectedDate}
            />
            <KpiCard      
              resource='Income'
              headerTitle={translate("performance.Income", "Денежные средства")}
              subTitle={translate("performance.IncomeSubTitle", "(млрд.)")}
              isLoading={isLoadingGlobal}
              //isLoadingDaily={isLoadingDailyIncome}
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
        <Col {...ColStyleRow2} >
          <TabComponentChart 
            data1={oilProductionDailyData}
            data2={oilRefiningDailyData}
            data3={oilTransportationDailyData}
            isLoading={isLoadingGlobal}
            isDolya={dolya}
          />
        </Col>
        <Col {...ColStyleRow2} >
          <div style={{
            width:'100%'
          }}>
            <PurchaseColumnChart 
              isLoading={isLoadingGlobal}
              data={PurchaseData?.data?.data}
            />
          </div>
          <Row gutter={[16, 16]} style={{marginTop:'12px'}}>
            <Col  xs={24} sm={24} md={12} lg={8} style={{display:'flex', flexWrap:'wrap'}}>
              <KpiListCard 
                data={IncidentData}
                isLoading={isLoadingGlobal}
                headerTitle={translate("performance.Incident", "")}
                resource='Incident'
              />
            </Col>
            <Col  xs={24} sm={24} md={12} lg={8} style={{display:'flex', flexWrap:'wrap'}}>
              <KpiListCard 
                data={AccidentData}
                isLoading={isLoadingGlobal}
                headerTitle={translate("performance.Accident", "")}
                resource='Accident'
              />
            </Col>
            <Col  xs={24} sm={24} md={12} lg={8} style={{display:'flex', flexWrap:'wrap'}}>
              <KpiListCard 
                data={DtpData}
                isLoading={isLoadingGlobal}
                headerTitle={translate("performance.Dtp", "")}
                resource='Dtp'
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
