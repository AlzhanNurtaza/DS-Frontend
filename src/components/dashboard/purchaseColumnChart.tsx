import { Column, ColumnConfig } from '@ant-design/charts'
import Icon from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components'
import { useGetLocale, useTranslate } from '@refinedev/core';
import { DatePicker, Typography, theme } from 'antd'
import React, { useState } from 'react'
import PurchaseIcon from '../../assets/icons/purchase.svg?react';
import { SimpleModal } from './simpleModal';
import dayjs from 'dayjs';
import ruRU from 'antd/es/date-picker/locale/ru_RU';
import { DATE_FULL_FORMAT } from '../../constants';
import { AxonModal } from './AxonModal';
import { AxonAttribute } from '../../common';


const {Text} = Typography;
const { useToken } = theme;



type Props = {
    isLoading:boolean,
    data:Data[],
    axonDataAttribute?:AxonAttribute
}
type Data = {
    id:number 
    attributes: Attribute
}

type Attribute = {
    year: number,
    plan:number,
    fact:number,
    actual:number,
    category:string,
    createdAt?:string,
    publishedAt?:string,
    updatedAt?:string,
}

const transformData = (data: Data[]): Attribute[] => {
    return data && data.map(item => item.attributes);
}

export const PurchaseColumnChart: React.FC<Props> = ({
    isLoading,
    data,
    axonDataAttribute
}) => {

    const translate = useTranslate();
    const localing = useGetLocale();
    const currentLocale = localing();
    const { token } = useToken();
    const currentDate= dayjs();
    const currentYear = dayjs().year();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const handleYearChange = (date:any, dateString:string) => {
        const year = dateString ? parseInt(dateString, 10) : currentYear;
        setSelectedYear(year);
    };
    const attributesArray = transformData(data);
    const filteredData = attributesArray && attributesArray.filter(item => item.year === selectedYear);
    let updated = filteredData && filteredData[0].publishedAt;
    updated = dayjs(updated).format(DATE_FULL_FORMAT);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tableData =  filteredData && filteredData.map(({ createdAt,publishedAt,updatedAt, ...rest }) => rest);

    const configZakupki:ColumnConfig = {
        autoFit:true,
        data:filteredData,
        height:220,
        xField: 'category',
        yField: 'value',
        seriesField: 'type',
        isGroup: true,
        appendPadding:20,
        legend:{
            position:'bottom',
            itemName: {
                style: {
                    fill: token.colorText
                }
            }
        },
        label: {
            position: 'top',
            style: {
              fill: token.colorText
            },
        },
        color:['#3182CE','#48BB78','#ED8936'],
        tooltip: {
            // Custom formatter function
            formatter: (datum) => {
                // Function to format number with spaces as thousand separators
                const formatNumberWithSpaces = (num:number) => {
                    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                };
    
                return {
                    name: datum.type,
                    value: formatNumberWithSpaces(Math.round(datum.value))
                };
            }
        },
        yAxis: {
            label: {
              style: {
                fill:token.colorText
              },
            },
        },
        xAxis: {
            label: {
              style: {
                fill:token.colorText
              },
            },
        },
      };
  return (
    <ProCard    
            loading={isLoading}  
            title={
                <Text style={{fontSize:'12px', display:'flex',alignItems:'center'}}>
                    <Icon component={PurchaseIcon} style={{ fontSize: '24px', marginRight: '5px' }} />
                    {translate("performance.Purchase", "План закупок группы КМГ")}
                    <Text style={{fontSize:'9px',fontWeight:'normal',marginLeft:'3px'}}>
                        {translate("performance.PurchaseSubTitle", "(млрд.)")}
                    </Text>
                    {<AxonModal axonDataAttribute={axonDataAttribute} />  }  
                </Text>
            }
            extra={<SimpleModal title='Данные' tableData={tableData} updated={updated}/>}
            boxShadow
            bodyStyle={{
                paddingInline:'8px'
            }}
            headStyle={{
                paddingInline:'8px'
            }}
        >
            <div style={{ paddingBottom: '10px' }}>
                <DatePicker 
                    locale={currentLocale==="en"? undefined:ruRU}
                    onChange={handleYearChange} 
                    picker="year"
                    defaultValue={dayjs(currentDate)} 
                />
            </div>
            <Column {...configZakupki} />
    </ProCard>
  )
}
