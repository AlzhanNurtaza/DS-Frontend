import React from 'react'
import { Statistic, theme, Typography} from 'antd'
import { ProCard } from '@ant-design/pro-components';
import { Area } from '@ant-design/plots';

import Icon from '@ant-design/icons';
import { AreaConfig } from '@ant-design/charts';
import { Trend } from './trend';
import { KpiSuffixPortion } from './kpiSuffixPortion';
import { SimpleModal } from './';
import dayjs from 'dayjs';
import { DATE_FORMAT, DATE_FULL_FORMAT } from '../../constants';
import './kpiCard.css';

import DobychaIcon from '../../assets/icons/dobycha.svg?react';
import PererabotkaIcon from '../../assets/icons/pererabotka.svg?react';
import TransportirovkaIcon from '../../assets/icons/transportirovka.svg?react';
import DengiIcon from '../../assets/icons/dengi.svg?react';
import IncomeIcon from '../../assets/icons/income.svg?react';
import { useTranslate } from '@refinedev/core';
import { AxonModal } from './AxonModal';

const getIconComponent = (resource:string) => {
    switch (resource) {
      case 'OilProduction':
        return DobychaIcon;
      case 'OilRefining':
        return PererabotkaIcon;
      case 'OilTransportation':
        return TransportirovkaIcon;
      case 'Money':
        return DengiIcon;
     case 'Income':
        return IncomeIcon;
      default:
        return null;
    }
  }


const { useToken } = theme;

const {Text} = Typography;


type Props = {
    resource:string,
    headerTitle:string,
    subTitle?:string
    isLoading:boolean,
    data: Data [],
    dataDaily?: Data [],
    isDolya?:boolean,
    isShort?:boolean,
    selectedDate?:string

}

type Data = {
    id:number 
    attributes: Attribute
}

type Attribute = {
    year?: number,
    date?:Date,
    value:number,
    value_coef:number,
    category:string,
    publishedAt?:string
}

type ChartData = {
    date: string,
    originalDate: Date, // Store the original Date object
    value: number,
    value_coef: number,
    category: string
};


function createChartData(data: Data[] | undefined): ChartData[] {
    if (!data) return [];
    const grouped: { [key: string]: ChartData } = {};

    data.forEach(item => {
        const date = item.attributes.date;
        const formattedDate = dayjs(date).format(DATE_FORMAT); 
        const category = item.attributes.category;

        if (date !== undefined) {
            const key = `${formattedDate}-${category}`;

            if (!grouped[key]) {
                grouped[key] = { 
                    originalDate: new Date(date), 
                    date: formattedDate, 
                    value: 0, 
                    value_coef: 0, 
                    category
                 }; 
            }
            grouped[key].value = Math.round((grouped[key].value + item.attributes.value) * 10) / 10;
            grouped[key].value_coef = Math.round((grouped[key].value_coef + item.attributes.value_coef) * 10) / 10;
        }
    });
    return Object.values(grouped);
}


function sortChartDataByDate(data: ChartData[]): ChartData[] {
    return data.sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime());
}

const ProcardCommonCss = {
    paddingInline:'6px'
}
const StatisticCommonCss = {
    display:'flex',
    alignItems: 'center', 
    gap: '4px',
}





export const KpiCard: React.FC<Props> = ({
    resource,
    headerTitle,
    subTitle,
    isLoading,
    data,
    isDolya= false,
    isShort=false,
}) => {

  const { token } = useToken();
  const translate = useTranslate();
  const IconComponent = getIconComponent(resource);

  
  let sumFact = 0;
  let sumPlan = 0;
  let percent = 0;
  let isDown = false;
  let chartData: ChartData[] = [];
  let mainData:Data [] | undefined = [];
  let updatedDate = '';


  mainData = data;
  if(mainData)
  {
    mainData.forEach((item,index) => {
    if(index===0){
        updatedDate = dayjs(item.attributes.publishedAt).format(DATE_FULL_FORMAT) ?? '';
    }
    if (item.attributes.category === 'Факт') {

        sumFact += isDolya ? item.attributes.value_coef: item.attributes.value;
    } else if (item.attributes.category === 'План') {
        sumPlan += isDolya ? item.attributes.value_coef: item.attributes.value;
    }
  });
  percent = Math.round((sumFact / sumPlan) * 1000) / 10;
  if(percent < 100){
    isDown=true;
  }
  chartData = sortChartDataByDate(createChartData(data));
}

const config:AreaConfig = {
    loading:isLoading,
    data:chartData,
    color: (datum) => {
        return datum.category === 'Факт' ? '#3182CE' : '#ED8936';
    },
    autoFit:true,
    //height:70,
    padding: [30, 0, 0, 0] ,
    xField: "date",
    yField: isDolya ? "value_coef" :"value",
    seriesField: "category",
    isStack:false,
    xAxis:false,
    tooltip: {
        domStyles: {
            'g2-tooltip': { 
              backgroundColor: 'rgb(255 255 255 / 85%)', 
            },
          },
        formatter: (datum) => {
            const formatNumberWithSpaces = (num:number) => {
                return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            };

            return {
                name: datum.category,
                value: formatNumberWithSpaces(Math.round(isDolya? datum.value_coef: datum.value))
            };
        },
    },
    legend: {
        position: 'top-right',
        itemName: {
            style: {
                fill: token.colorText,
                fontSize: 10, // Set the font size to 10px
                // Additional styling properties can go here
            }
        },
        itemSpacing: 0
    },
    yAxis:{ 
        
        tickCount:0, 
        label: {
            style:{
            stroke:'transparent'
            }
        },
        grid:{
            line:{
                style:{
                    stroke:'transparent'
                }
            }
        }
    },
    meta: {
        date: {
            range: [0, 1]
        },
        count: {
            min: 0
        },
    },
  };
  
  let cleanedChartData= [];
  if(resource==='Income' || resource==='Money'){
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     cleanedChartData = chartData.map(({ originalDate, value_coef, date, ...rest }) => ({
        date: dayjs(date,DATE_FORMAT).format('Q-YYYY') ,
        ...rest,
        
      }));
  }
  else if (resource==='OilTransportation'){
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cleanedChartData = chartData.map(({ originalDate,value_coef, ...rest }) => rest);
  }
  else
  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cleanedChartData = chartData.map(({ originalDate, ...rest }) => rest);
  }
  

  return (
    <>
    <ProCard
        loading={isLoading}
        title={
            <Text style={{fontSize:'12px', display:'flex',alignItems:'center'}}>
                {IconComponent && <Icon component={IconComponent} style={{ fontSize: '24px', marginRight: '5px',color:'#FFFFFF' }} />}
                {headerTitle}
                { subTitle &&  <Text style={{fontSize:'9px',fontWeight:'normal',marginLeft:'3px'}}>{subTitle}</Text>}
                {<AxonModal/>}   
            </Text>}
        extra={<SimpleModal title='Данные' tableData={cleanedChartData} updated={updatedDate}/>}
        split='vertical'
        bordered
        boxShadow={isShort?false:true}
        headerBordered
        headStyle={{
            ...ProcardCommonCss,
            paddingBlockEnd:isShort?'4px':'16px ',
            paddingBlock:isShort?'4px':'16px'
        }}
    >
         <ProCard split="vertical" style={{height:'100%'}}>
            <ProCard split="horizontal" colSpan={isShort?"100%":"55%"}>
                <ProCard bodyStyle={{...ProcardCommonCss,
                    backgroundColor:token.colorBgBase,
                    paddingBlock:isShort?0:'16px',
                }}
                >
                    
                    <Statistic 
                        title={translate("performance.fact", "Факт")}
                        value={sumFact} 
                        precision={0}
                        groupSeparator=' '
                        style={StatisticCommonCss}  
                        valueStyle={{
                            fontSize: isShort? token.fontSizeLG: token.fontSizeLG,
                            fontWeight:'bold',
                        }}
                        suffix={<><Trend isDown={isDown} /><KpiSuffixPortion stringValue={percent.toString()} isDown={isDown}/></>}

                    />
                </ProCard>
                <ProCard
                  bodyStyle={{
                    ...ProcardCommonCss,
                    paddingBlock:isShort?0:'16px'
                }}  
                >
                    <Statistic 
                            title={translate("performance.plan", "План")}
                            value={sumPlan} 
                            precision={0}
                            groupSeparator=' '
                            style={StatisticCommonCss}  
                            valueStyle={{
                                fontSize: isShort? token.fontSizeLG: token.fontSizeLG,
                                fontWeight:'bold',
                            }}

                        />
                </ProCard>
            </ProCard>
            <ProCard  
            style={{
                height:'100%',
                maxHeight:'150px'
            }}
            className='performance-procard-chart'
            bodyStyle={{
                paddingInline:0,
                paddingBlock:0,
                paddingTop:'10px'
            }}>
                
                <Area {...config} className='chart-canvas' /> 
            </ProCard>
         </ProCard>

    </ProCard>
    </>

  )
}



