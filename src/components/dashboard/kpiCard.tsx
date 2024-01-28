import React from 'react'
import { Statistic, theme, Typography} from 'antd'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Area } from '@ant-design/plots';

import Icon from '@ant-design/icons';
import DobychaIcon from '../../assets/icons/dobycha.svg?react';
import ExclamantionIcon from '../../assets/icons/exclamation.svg?react';
import { AreaConfig } from '@ant-design/charts';
import { Trend } from './trend';
import './kpiCard.css';



const { useToken } = theme;
const {Text, Link} = Typography;


type Props = {
    resource:string,
    title:string,
    data:Attribute[],
    isLoading:boolean
}

type Attribute ={
    id:number,
    attributes: Rate
}

type Rate = {
    title:string,
    value:string,
    arrow:string
}

const ProcardCommonCss = {
    paddingInline:'6px'
}
const StatisticCommonCss = {
    display:'flex',
    alignItems: 'center', 
    gap: '8px'
}

const data = [
    {"date":"2021-11-17", "category":"Факт", "value":23.87625},
    {"date":"2021-11-17", "category":"План", "value":20.32322},
    {"date":"2021-11-17", "category":"Факт","value":21.21381},
    {"date":"2021-11-18", "category":"План", "value":25.87625},
    {"date":"2021-11-18", "category":"Факт", "value":22.32322},
    {"date":"2021-11-18", "category":"План","value":19.21381},
    {"date":"2021-11-19", "category":"Факт", "value":26.87625},
    {"date":"2021-11-19", "category":"План", "value":24.32322},
    {"date":"2021-11-19", "category":"Факт","value":25.21381},
]




export const KpiCard = () => {
  const { token } = useToken();
  const config:AreaConfig = {
    data,
    color:['#3182CE','#ED8936'],
    autoFit:true,
    height:150,
    padding: [30, 0, 0, 0] ,
    xField: "date",
    yField: "value",
    seriesField: "category",
    isStack:false,
    xAxis:false,
    
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
        title={
            <Text style={{fontSize:'12px', display:'flex',alignItems:'center'}}>
                <Icon component={DobychaIcon} style={{fontSize:'24px',marginRight:'5px'}}  /> 
                Транспортировка нефти
                {<Text style={{fontSize:'9px',fontWeight:'normal',marginLeft:'3px'}}>(тыс.тонн)</Text>}
                <Link href='#' style={{marginBottom:'5px', marginLeft:'5px'}}>
                    <Icon component={ExclamantionIcon}   />
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
            <ProCard split="horizontal" colSpan="45%">
                <ProCard bodyStyle={{...ProcardCommonCss,
                    backgroundColor:token.colorBgBase
                }}>
                    
                    <Statistic 
                        title="Факт" 
                        value={112893} 
                        precision={0}
                        groupSeparator=' '
                        style={StatisticCommonCss}  
                        valueStyle={{
                            fontSize:token.fontSizeLG,
                            fontWeight:'bold',
                        }}
                        prefix={<Trend  />}
                        suffix={<Text style={{fontWeight:'normal',fontSize:token.fontSizeSM}}>100.4%</Text>}

                    />
                </ProCard>
                <ProCard
                  bodyStyle={ProcardCommonCss}  
                >
                    <Statistic 
                            title="План" 
                            value={112893} 
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
                //width:'165px'
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
