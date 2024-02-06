import { Bar, BarConfig } from '@ant-design/charts';
import { ProCard } from '@ant-design/pro-components';
import { theme,Typography } from 'antd';
import React, { useState } from 'react'
import "./TabComponentChart.css";
import DobychaIcon from '../../assets/icons/dobycha.svg?react';
import PererabotkaIcon from '../../assets/icons/pererabotka.svg?react';
import TransportirovkaIcon from '../../assets/icons/transportirovka.svg?react';
import Icon from '@ant-design/icons';
import { useTranslate } from '@refinedev/core';

const { useToken } = theme;
const {Text} = Typography;



  type Props = {
    isLoading:boolean,
    isDolya:boolean,
    data1:Data[],
    data2:Data[],
    data3:Data[],

}
type Data = {
    id:number 
    attributes: Attribute
}

type Attribute = {
    dzo:string,
    year?: number,
    date?:Date,
    value:number,
    value_coef:number,
    category:string
}

type ChartData = {

    dzo: string,
    value: number,
    value_coef: number,
    category: string
};




function createChartData(data: Data[] | undefined): ChartData[] {
    if (!data)
    return [];
    const grouped: { [key: string]: ChartData } = {};

    data.forEach(item => {
        const dzo = item.attributes.dzo;
        const category = item.attributes.category;

        if (dzo !== undefined) {
            const key = `${dzo}-${category}`;

            if (!grouped[key]) {
                grouped[key] = { dzo, value: 0, value_coef: 0, category };
            }
            grouped[key].value = Math.round((grouped[key].value + item.attributes.value) * 10) / 10;
            grouped[key].value_coef = Math.round((grouped[key].value_coef + item.attributes.value_coef) * 10) / 10;
        }
    });

    return Object.values(grouped);
}

function sortChartDataByValue(data: ChartData[], isDolya:boolean): ChartData[] {
    
    if(isDolya){
        return data.sort((a, b) => {
            if (a.value_coef < b.value_coef) {
                return 1; 
            }
            if (a.value_coef > b.value_coef) {
                return -1; 
            }
            return 0;
        });
    }
    return data.sort((a, b) => {
        if (a.value < b.value) {
            return 1; 
        }
        if (a.value > b.value) {
            return -1; 
        }
        return 0;
    }); 
    
}


const tabsCardCss:React.CSSProperties = {
        overflowX:'auto',
        height:'500px'
}

const chartHeightDiv:React.CSSProperties = {
    height:'800px',
}





export const TabComponentChart : React.FC<Props> = ({
    data1,
    isLoading,
    isDolya=false,
    data2,
    data3
}) => {
    const chartData1 = sortChartDataByValue(createChartData(data1),isDolya);
    const chartData2 = sortChartDataByValue(createChartData(data2),isDolya);
    const chartData3 = sortChartDataByValue(createChartData(data3),isDolya);
    const { token } = useToken();
    const translate = useTranslate();
    const [tab, setTab] = useState('tab1');


    const createConfig = (chartData: ChartData[]): BarConfig => ({
        loading:isLoading,
        data:chartData,
        isGroup: true,
        xField: isDolya ? 'value_coef':'value',
        yField: 'dzo',
        seriesField: 'category',
        dodgePadding: 4,
        //autoFit:false,
        legend:{
            position:'bottom',
            itemName: {
                style: {
                    fill: token.colorText
                }
            }
        },
        color: (datum) => {
            return datum.category === 'Факт' ? '#3182CE' : '#ED8936';
        },
        label: {

            position: 'right',
            style: {
              fill: token.colorText,
            },
        },
        yAxis: {    
            label: {
              style: {
                fill:token.colorText,

              },
              
              
            },
        },
        tooltip: {
            // Custom formatter function
            formatter: (datum) => {
                // Function to format number with spaces as thousand separators
                const formatNumberWithSpaces = (num:number) => {
                    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                };
    
                return {
                    name: datum.category,
                    value: formatNumberWithSpaces(Math.round(datum.value))
                };
            }
        },
        appendPadding:[0,40,0,0],
        barWidthRatio: 0.6,
    });


    const config1 = createConfig(chartData1);
    const config2 = createConfig(chartData2);
    const config3 = createConfig(chartData3);
    
  return (
    <>
        <ProCard
            loading={isLoading}
            tabs={{
            tabPosition:'top',
            destroyInactiveTabPane: true,   
            activeKey: tab,
            items: [
                {
                label:
                    <Text style={{
                        display:'flex'
                    }}>
                        <Icon component={DobychaIcon} style={{ fontSize: '24px', marginRight: '5px' }} />
                        {translate("performance.OilProduction", "Добыча нефти")}
                    </Text>,
                key: 'tab1',
                style:tabsCardCss,
                children: !isLoading && <div style={chartHeightDiv}><Bar {...config1}  /></div>,
                },
                {
                label: <Text style={{
                            display:'flex'
                        }}>
                            <Icon component={PererabotkaIcon} style={{ fontSize: '24px', marginRight: '5px' }} />
                            {translate("performance.OilRefining", "Переработка нефти")}
                        </Text>,
                key: 'tab2',
                style:tabsCardCss,
                children: !isLoading && <div style={{...chartHeightDiv,height:'460px'}}><Bar {...config2}  /></div>,
                },
                {
                label: <Text style={{
                            display:'flex'
                        }}>
                            <Icon component={TransportirovkaIcon} style={{ fontSize: '24px', marginRight: '5px' }} />
                            {translate("performance.OilTransportation", "Транспортировка нефти")}
                        </Text>,
                key: 'tab3',
                style:tabsCardCss,
                children: !isLoading && <div style={chartHeightDiv}><Bar {...config3}  /></div>,
                },
            ],
            onChange: (key) => {
                setTab(key);
            },
            }}
        />
    </>
  )
}
