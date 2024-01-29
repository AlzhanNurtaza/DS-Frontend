import { Column, ColumnConfig } from '@ant-design/charts'
import Icon from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components'
import { useTranslate } from '@refinedev/core';
import { DatePicker, Typography } from 'antd'
import React, { useState } from 'react'
import PurchaseIcon from '../../assets/icons/purchase.svg?react';
import { SimpleModal } from './simpleModal';
import dayjs from 'dayjs';

const {Text} = Typography;



type Props = {
    isLoading:boolean,
    data:Data[],
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
    category:string
}

const transformData = (data: Data[]): Attribute[] => {
    return data && data.map(item => item.attributes);
}

export const PurchaseColumnChart: React.FC<Props> = ({
    isLoading,
    data
}) => {

    const translate = useTranslate();
    const currentDate= dayjs();
    const currentYear = dayjs().year();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const handleYearChange = (date:any, dateString:string) => {
        const year = dateString ? parseInt(dateString, 10) : currentYear;
        setSelectedYear(year);
    };
    const attributesArray = transformData(data);
    const filteredData = attributesArray && attributesArray.filter(item => item.year === selectedYear);

    const configZakupki:ColumnConfig = {
        autoFit:true,
        data:filteredData,
        height:220,
        xField: 'category',
        yField: 'value',
        seriesField: 'type',
        isGroup: true,
        label:{
          position:'top'
        },
        legend:{
          position:'bottom'
        },
        color:['#3182CE','#48BB78','#ED8936']
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
                    {<SimpleModal title='Axon' isAxon={true}/>}  
                </Text>
            }
            extra={<SimpleModal title='Данные' tableData={filteredData}/>}
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
                    onChange={handleYearChange} 
                    picker="year"
                    defaultValue={dayjs(currentDate)} 
                />
            </div>
            <Column {...configZakupki} />
    </ProCard>
  )
}
