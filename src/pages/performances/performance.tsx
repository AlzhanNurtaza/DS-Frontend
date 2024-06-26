import React, { useEffect, useState } from 'react'
import { Col, ConfigProvider, DatePicker, Row, Space, Switch, 
  TimeRangePickerProps, 
  Typography, theme } 
from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import 'dayjs/locale/ru'; 
import { useCustom, useGetLocale, useTranslate } from '@refinedev/core';
import { ExchangeCard,KpiCard,KpiListCard,PurchaseColumnChart,TabComponentChart} from '../../components/dashboard';
import dayjs,{ Dayjs } from 'dayjs';
import './styles.css';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import updateLocale from 'dayjs/plugin/updateLocale';
dayjs.extend(updateLocale);




import { API_URL, DATE_API_FORMAT, DATE_FORMAT } from "../../constants";
import { ProCard } from '@ant-design/pro-components';
import { useApiDataCustom } from '../../hooks/useApiDataCustom';
import { QuarterPicker } from '../../components/dashboard/QuarterPicker';
import { AxonAttribute, AxonDataItem } from '../../common';

const {Text} = Typography; 
const { useToken } = theme;
const { RangePicker } = DatePicker;
dayjs.extend(quarterOfYear);

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
  const translate = useTranslate();
  const { token } = useToken();
  const localing = useGetLocale();
  const currentLocale = localing();




  const [selectedDate] = useState('');
  const [dolya, setDolya] = useState(false);
  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: translate("performance.yesterday", "Вчера"), value: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')] },
    { label: translate("performance.prev7Days", "Дата"), value: [dayjs().subtract(7, 'day'), dayjs()] },
    {
      label: translate("performance.thisMonth", "This month"),
      // Start of this month to now
      value: [dayjs().startOf('month'), dayjs()]
    },
    {
      label: translate("performance.thisYear", "This year"),
      // Start of this year to now
      value: [dayjs().startOf('year'), dayjs()]
    },
    {
      label: translate("performance.lastMonth", "Last month"),
      value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')]
    },
    {
      label: translate("performance.lastYear", "Last year"),
      value: [dayjs().subtract(1, 'year').startOf('year'), dayjs().subtract(1, 'year').endOf('year')]
    },
  ];

  const [startDateString, setStartDateString] = useState(dayjs().startOf('year').format(DATE_API_FORMAT));
  const [endDateString, setEndDateString] = useState(dayjs().format(DATE_API_FORMAT));

  const [currentTab, setCurrentTab] = useState('OilProduction');

  

  const defaultDates = [dayjs().startOf('year'), dayjs()];
  const [dates, setDates] = useState<any>(defaultDates);
  const handleDatesChange:any = (dates: [Dayjs,Dayjs] | undefined, dateString:string[]) => {
    if(dateString[0]=='' || dateString[1]==''){
      setDates(defaultDates);
      setStartDateString(defaultDates[0].format(DATE_API_FORMAT))
      setEndDateString(defaultDates[1].format(DATE_API_FORMAT))
    }
    else if (dates && dates.length === 2) {
      setDates(dates);
      if(dates !== undefined && dates.length > 1){
        setStartDateString(dates[0].format(DATE_API_FORMAT))
        setEndDateString(dates[1].format(DATE_API_FORMAT))
      }

    }
  };

  //Квартал
  const [quarter,setQuarter] =useState<Dayjs>(dayjs().subtract(1, 'quarter').startOf('quarter'));
  const handleQuarterChange:any = (date: Dayjs, dateString:string) => {
    if(dateString==''){
      setQuarter(dayjs().subtract(1, 'quarter').startOf('quarter'));
    }
    else {
      setQuarter(date);
    }
    
  };

  //Курсы 
  const { data: currencyData, isLoading: isLoading } = useApiDataCustom('currencies', 
  {
    'sort[0]':'date:desc',
    'sort[1]':'category:desc',
    'filters[category][$eq][0]':'$',
    'filters[category][$eq][1]':'€',
    'filters[category][$eq][2]':'₽',
    'filters[date][$gte][0]':startDateString,
    'filters[date][$lte][1]':endDateString,
    "pagination[page]":1,
    "pagination[pageSize]":3,
  },[startDateString,endDateString],false);

  
  

  //aix
  const { data: aixData, isLoading: isLoadingAix } = useApiDataCustom('aixes', {
    'sort[0]':'date:desc',
    'filters[date][$gte][0]':startDateString,
    'filters[date][$lte][1]':endDateString,
    "pagination[page]":1,
    "pagination[pageSize]":1,
  }, [startDateString,endDateString],false); 

  //kase
  const { data: kaseData, isLoading: isLoadingKase } = useApiDataCustom('kases', {
    'sort[0]':'date:desc',
    'filters[date][$gte][0]':startDateString,
    'filters[date][$lte][1]':endDateString,
    "pagination[page]":1,
    "pagination[pageSize]":1,
  }, [startDateString,endDateString],false); 


    //Brent
  const { data: brentData, isLoading: isLoadingbrentData } = useApiDataCustom('daily-stocks', {
      'sort[0]':'date:desc',
      'filters[category][$eq][0]':'KEBCO',
      'filters[category][$eq][1]':'BRENT',
      'filters[date][$gte][0]':startDateString,
      'filters[date][$lte][1]':endDateString,
      "pagination[page]":1,
      "pagination[pageSize]":2,
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
  const { data: oilTransportationDailyData, isLoading: isLoadingDailyOTD } = useApiDataCustom('oil-transportations', {
    'sort[0]':'date:desc',
    'filters[date][$gte][0]':startDateString,
    'filters[date][$lte][1]':endDateString,
    "pagination[page]":1,
    "pagination[pageSize]":500,
  }, [startDateString,endDateString],true); 



  //Деньги
  const { data: DepositData, isLoading: isLoadingDeposit } = useApiDataCustom('deposits', {
    'sort[0]':'date:desc',
    'filters[date][$eq]':quarter.format(DATE_API_FORMAT),
    "pagination[page]":1,
    "pagination[pageSize]":100,
  }, [quarter],true); 
  


  //Чистые доходы
  const { data: IncomeData, isLoading: isLoadingIncome } = useApiDataCustom('incomes', {
    'sort[0]':'date:desc',
    'filters[date][$eq]':quarter.format(DATE_API_FORMAT),
    "pagination[page]":1,
    "pagination[pageSize]":100,
  }, [quarter],true); 

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

  //Axon
  const { data: axonData, isLoading: isAxonLoading } = useApiDataCustom<AxonDataItem[]>('axons', {
    "pagination[page]":1,
    "pagination[pageSize]":100,
  }, [],true); 

  // Function to search for attributes by refNumber
  const findAttributesByRefNumber = (axonData: AxonDataItem[], refNumber: string): AxonAttribute | undefined => {
    if(!isAxonLoading){
      const item = axonData.find((item:any) => item?.attributes.refNumber ===refNumber);
      return item ? item.attributes : undefined;
    }
    return undefined;

  };

  const [isLoadingGlobal, setIsLoadingGlobal] = useState(true);
  useEffect(() => {

    const anyLoading = isLoading  
    || isLoadingAix 
    || isLoadingKase 
    || isLoadingbrentData 
    || isLoadingDailyOPD 
    || isLoadingDailyORD 
    || isLoadingDailyOTD 
    || isLoadingDeposit  
    || isLoadingIncome  
    || isLoadingPurchase 
    || isLoadingIncident 
    || isLoadingAccident 
    || isLoadingDtp;
  
    setIsLoadingGlobal(anyLoading);
  }, [
    isLoading, isLoadingbrentData,isLoadingAix,isLoadingKase, isLoadingDailyOPD, 
    isLoadingDailyORD, isLoadingDailyOTD, isLoadingDeposit, 
    isLoadingIncome, isLoadingPurchase, isLoadingIncident, 
    isLoadingAccident, isLoadingDtp
  ]);


  
  



  return (
    <>
      <Row gutter={[24,12]} style={{ 
          display: 'flex', 
          alignContent:'flex-start',
        }} className="row-margin-top" >
        <Col {...topColStyle}  >
        
          <Space  direction="vertical" style={{ display: 'flex' }}>
            <Space>
            <Text style={{color:token.colorWhite, fontSize:'small'}}>
              {translate(dolya? "performance.dolya":"performance.wihtoutDolya", "Без доли")}
            </Text>
            <Switch 
                style={{ marginRight: '5px' }}
                checked={dolya} 
                onChange={(checked) => setDolya(checked)} 
            />
            </Space>
            <Space>
            <Text style={{color:token.colorWhite, fontSize:'small'  }}>{translate("performance.date", "Дата")}</Text>
            <ConfigProvider locale={currentLocale !== 'en' ? ruRU : undefined}>
              <RangePicker  
                  value={dates}
                  onChange={handleDatesChange}
                  presets={rangePresets}
                  format={DATE_FORMAT}
                />            
            </ConfigProvider>

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
              data={[...kaseData, ...aixData]}
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
            axonDataAttribute = {findAttributesByRefNumber(axonData,'DS-637')}
            handleDatesChange={handleDatesChange}
            setCurrentTab={setCurrentTab}
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
            axonDataAttribute = {findAttributesByRefNumber(axonData,'DS-906')}
            handleDatesChange={handleDatesChange}
            setCurrentTab={setCurrentTab}
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
            axonDataAttribute = {findAttributesByRefNumber(axonData,'DS-978')}
            handleDatesChange={handleDatesChange}
            setCurrentTab={setCurrentTab}
          />
        </Col>
        <Col {...ColStyle}>
        
          <ProCard
          boxShadow
          style={{
            width:'100%',
            padding:0,
            maxHeight:'250px'
            
          }}
          bodyStyle={{
            padding:0,
            display:'flex',
            flexDirection:'column',
            gap:0,
            justifyContent:'space-between',height:'100%'
          }}
          
          >
            <QuarterPicker
              locale={currentLocale}
              onChange={handleQuarterChange}
              value={quarter}
            />
            <KpiCard      
              resource='Money'
              headerTitle={translate("performance.Money", "Денежные средства")}
              subTitle={translate("performance.MoneySubTitle", "(млрд.)")}
              isLoading={isLoadingGlobal}
              data={DepositData}
              isShort={true}
              axonDataAttribute = {findAttributesByRefNumber(axonData,'GLOS-3061')}
            />
            <KpiCard      
              resource='Income'
              headerTitle={translate("performance.Income", "Денежные средства")}
              subTitle={translate("performance.IncomeSubTitle", "(млрд.)")}
              isLoading={isLoadingGlobal}
              data={IncomeData}
              isShort={true}
              axonDataAttribute = {findAttributesByRefNumber(axonData,'GLOS-3443')}
              
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
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </Col>
        <Col {...ColStyleRow2} >  
          <div style={{
            width:'100%'
          }}>
            <PurchaseColumnChart 
              isLoading={isLoadingGlobal}
              data={PurchaseData?.data?.data}
              axonDataAttribute = {findAttributesByRefNumber(axonData,'DS-979')}
            />
          </div>
          <Row gutter={[16, 16]} style={{marginTop:'12px'}}>
            <Col  xs={24} sm={24} md={12} lg={8} style={{display:'flex', flexWrap:'wrap'}}>
              <KpiListCard 
                data={IncidentData}
                isLoading={isLoadingGlobal}
                headerTitle={translate("performance.Incident", "")}
                resource='Incident'
                axonDataAttribute = {findAttributesByRefNumber(axonData,'GLOS-3444')}
              />
            </Col>
            <Col  xs={24} sm={24} md={12} lg={8} style={{display:'flex', flexWrap:'wrap'}}>
              <KpiListCard 
                data={AccidentData}
                isLoading={isLoadingGlobal}
                headerTitle={translate("performance.Accident", "")}
                resource='Accident'
                axonDataAttribute = {findAttributesByRefNumber(axonData,'GLOS-3446')}
              />
            </Col>
            <Col  xs={24} sm={24} md={12} lg={8} style={{display:'flex', flexWrap:'wrap'}}>
              <KpiListCard 
                data={DtpData}
                isLoading={isLoadingGlobal}
                headerTitle={translate("performance.Dtp", "")}
                resource='Dtp'
                axonDataAttribute = {findAttributesByRefNumber(axonData,'GLOS-3445')}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
