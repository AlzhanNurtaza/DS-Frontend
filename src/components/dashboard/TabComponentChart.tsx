import { Bar, BarConfig } from '@ant-design/charts';
import { ProCard } from '@ant-design/pro-components';
import { Button, theme,Typography } from 'antd';
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
    export?:string,
    market?:string,
    year?: number,
    date?:Date,
    value:number,
    value_coef:number,
    category:string
}

type ChartData = {

    dzo: string,
    export?:string,
    market?:string,
    value: number,
    value_coef: number,
    category: string
};
interface ChartClickEvent {
    data: {
      data: {
        dzo: string;
        export?:string,
        market?:string,
        value: number;
        value_coef: number;
        category: string;
      };
    };
  }




function createChartData(data: Data[] | undefined, isGroup=false,level=0): ChartData[] {
    if (!data)
    return [];
    const grouped: { [key: string]: ChartData } = {};

    data.forEach(item => {
        let fieldValue = item.attributes.dzo;
        if(isGroup){
            if(level===0){
                fieldValue = item.attributes.export ?? '';
            } else if(level===1){
                fieldValue = item.attributes.market ?? '';
            }
        }
        const dzo = fieldValue;
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
        height:'460px'
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

    const [drillFilter, setDrillFilter] = useState('');
    const [drillLevel, setDrillLevel] = useState(0);
    const [currentData, setCurrentData] = useState<ChartData[]>([]);



    const chartData1 = sortChartDataByValue(createChartData(data1),isDolya);
    const chartData2 = sortChartDataByValue(createChartData(data2),isDolya);
    const chartData3 = sortChartDataByValue(createChartData(data3,true),isDolya);
    const { token } = useToken();
    const translate = useTranslate();
    const [tab, setTab] = useState('tab1');







    const createConfig = (chartData: ChartData[],isDrillDownChart=false): BarConfig => ({
        loading:isLoading,
        data:chartData,
        isGroup: true,
        xField: isDolya ? 'value_coef':'value',
        yField: 'dzo',
        seriesField: 'category',
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
            formatter: (text, item) => {
                const value = item._origin[isDolya ? 'value_coef' : 'value']; // Accessing the original data value
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
            formatter: (datum) => {
                // Function to format number with spaces as thousand separators
                const formatNumberWithSpaces = (num:number) => {
                    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                };
        
                // Determine the correct field based on isDolya
                const valueField = isDolya ? 'value_coef' : 'value';
                const value = datum[valueField] ? Math.round(datum[valueField]) : NaN; // Safeguard against undefined values
        
                return {
                    name: datum.category,
                    value: isNaN(value) ? 'N/A' : formatNumberWithSpaces(value)
                };
            }
        },
        appendPadding:[0,40,0,0],
        barWidthRatio: 0.6,
        onReady: (plot) => {
            (drillFilter==='' && isDrillDownChart) && plot.on('element:click', ({ data}:ChartClickEvent) => {
              const item = data.data;
              handleBarClick(item);
            });
        },
          
    });




    


    const config1 = createConfig(chartData1);
    const config2 = createConfig(chartData2);
    const config3 = createConfig(currentData.length?currentData:chartData3,true);


    const handleBarClick = (data: ChartData) => {
        if (data.dzo) { 
            setDrillFilter(data.dzo);
            setDrillLevel(prev=>{
                if(prev>=2)
                    return 2;
                return prev+1;
            });
        }
    };

    const resetDrillDown = () => {
        setDrillLevel(0);
        setDrillFilter('');

    };


    React.useEffect(() => {
        let detailedData: ChartData[] = [];
        switch(drillLevel) {
            case 0:
                detailedData = chartData3;
                break;
            case 1: 
                detailedData = sortChartDataByValue(createChartData(data3.filter(item => item.attributes.export === drillFilter),true,1),isDolya);
                break;
            case 2:
                detailedData = sortChartDataByValue(createChartData(data3.filter(item => item.attributes.market === drillFilter),true,2),isDolya);
                break;
            default:
                break;
                
        }
        if(detailedData.length>0){
            setCurrentData(detailedData);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drillFilter,drillLevel]);
    

    
  return (
    <>
        <ProCard
            boxShadow
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
                children: !isLoading && <div style={{...chartHeightDiv,height:'400px'}}><Bar {...config2}  /></div>,
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
                children: !isLoading && 
                    <div style={{...chartHeightDiv,height:'400px'}}>
                        {drillFilter && <Button onClick={resetDrillDown} type="primary">
                        {translate("performance.back", "Транспортировка нефти")}
                        </Button>}
                        <Bar {...config3}/>
                    </div>
                }
            ],
            onChange: (key) => {
                setTab(key);
            },
            }}
        />
    </>
  )
}
