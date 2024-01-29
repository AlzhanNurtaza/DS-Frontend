import React from 'react'
import { Statistic, theme, Typography} from 'antd'
import { ProCard } from '@ant-design/pro-components';
import { Area } from '@ant-design/plots';

import Icon from '@ant-design/icons';
import ExclamantionIcon from '../../assets/icons/exclamation.svg?react';
import { AreaConfig } from '@ant-design/charts';
import { Trend } from './trend';
import { KpiSuffixPortion } from './kpiSuffixPortion';
import './kpiCard.css';

import DobychaIcon from '../../assets/icons/dobycha.svg?react';
import PererabotkaIcon from '../../assets/icons/pererabotka.svg?react';
import TransportirovkaIcon from '../../assets/icons/transportirovka.svg?react';
import DengiIcon from '../../assets/icons/dengi.svg?react';

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
      default:
        return null;
    }
  }


const { useToken } = theme;
const {Text, Link} = Typography;


type Props = {
    resource:string,
    headerTitle:string,
    subTitle?:string
    isLoading:boolean,
    data: Data [],
    dataDaily?: Data [],
    isLoadingDaily?:boolean,
    isDolya?:boolean
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
    category:string
}

type ChartData = {
    date: Date,
    value: number,
    value_coef: number,
    category: string
};


function createChartData(data: Data[] | undefined): ChartData[] {
    if (!data)
    return [];
    const grouped: { [key: string]: ChartData } = {};

    data.forEach(item => {
        const date = item.attributes.date;
        const category = item.attributes.category;

        if (date !== undefined) {
            const key = `${date}-${category}`;

            if (!grouped[key]) {
                grouped[key] = { date, value: 0, value_coef: 0, category };
            }

            grouped[key].value += item.attributes.value;
            grouped[key].value_coef += item.attributes.value_coef;
        }
    });

    return Object.values(grouped);
}

function sortChartDataByDate(data: ChartData[]): ChartData[] {
    return data.sort((a, b) => {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    });
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
    dataDaily,
    isLoadingDaily,
    isDolya= false
}) => {
  const { token } = useToken();
  const IconComponent = getIconComponent(resource);
  
  
  let sumFact = 0;
  let sumPlan = 0;
  let percent = 0;
  let isDown = false;
  let chartData: ChartData[] = [];

  if(data)
  {
  data.forEach(item => {
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
  chartData = sortChartDataByDate(createChartData(dataDaily));
}

const config:AreaConfig = {
    loading:isLoadingDaily,
    data:chartData,
    color: (datum) => {
        return datum.category === 'Факт' ? '#3182CE' : '#ED8936';
    },
    autoFit:true,
    height:150,
    padding: [30, 0, 0, 0] ,
    xField: "date",
    yField: isDolya ? "value_coef" :"value",
    seriesField: "category",
    isStack:false,
    xAxis:false,
    tooltip: {
        // Custom formatter function
        formatter: (datum) => {
            // Function to format number with spaces as thousand separators
            const formatNumberWithSpaces = (num:number) => {
                return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            };

            return {
                name: datum.category,
                value: formatNumberWithSpaces(Math.round(isDolya? datum.value_coef: datum.value))
            };
        }
    },
    legend:{
        position:'top-right',
        itemName: {
            style: {
                fill: token.colorText
            }
        }
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

  return (
    <ProCard
        loading={isLoading}
        title={
            <Text style={{fontSize:'12px', display:'flex',alignItems:'center'}}>
                {IconComponent && <Icon component={IconComponent} style={{ fontSize: '24px', marginRight: '5px',color:'#FFFFFF' }} />}
                {headerTitle}
                { subTitle &&  <Text style={{fontSize:'9px',fontWeight:'normal',marginLeft:'3px'}}>{subTitle}</Text>}
                <Link href='#' style={{marginBottom:'5px', marginLeft:'5px'}}>
                    <Icon component={ExclamantionIcon}  />
                </Link>    
            </Text>}
        extra={<Link style={{fontSize:'9px',color:token.colorTextQuaternary}} href='#'>ОТКРЫТЬ</Link>}
        split='vertical'
        bordered
        boxShadow
        headerBordered
        headStyle={ProcardCommonCss}
    >
         <ProCard split="vertical">
            <ProCard split="horizontal" colSpan="50%">
                <ProCard bodyStyle={{...ProcardCommonCss,
                    backgroundColor:token.colorBgBase
                }}>
                    
                    <Statistic 
                        title="Факт" 
                        value={sumFact} 
                        precision={0}
                        groupSeparator=' '
                        style={StatisticCommonCss}  
                        valueStyle={{
                            fontSize:token.fontSizeLG,
                            fontWeight:'bold',
                        }}
                        prefix={<Trend isDown={isDown} />}
                        suffix={<KpiSuffixPortion stringValue={percent.toString()} isDown={isDown}/>}

                    />
                </ProCard>
                <ProCard
                  bodyStyle={ProcardCommonCss}  
                >
                    <Statistic 
                            title="План" 
                            value={sumPlan} 
                            precision={0}
                            groupSeparator=' '
                            style={StatisticCommonCss}  
                            valueStyle={{
                                fontSize:token.fontSizeLG,
                                fontWeight:'bold',
                            }}

                        />
                </ProCard>
            </ProCard>
            <ProCard  
            style={{
                height:'100%',
            }}
            className='performance-procard-chart'
            bodyStyle={{
                paddingInline:0,
                paddingBlock:0,
            }}>
                
                <Area {...config} className='chart-canvas' /> 
            </ProCard>
         </ProCard>

    </ProCard>

  )
}
