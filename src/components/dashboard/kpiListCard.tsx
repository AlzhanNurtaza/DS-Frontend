import { ProCard } from '@ant-design/pro-components'
import React from 'react'
import { List, Typography, theme } from 'antd'
import Icon from '@ant-design/icons';
import IncidentIcon from '../../assets/icons/incident.svg?react';
import AccidentIcon from '../../assets/icons/accident.svg?react';
import DtpIcon from '../../assets/icons/dtp.svg?react';
import { SimpleModal } from './simpleModal';
import {useTranslate} from '@refinedev/core';
import dayjs from 'dayjs';
import { DATE_FORMAT, DATE_FULL_FORMAT } from '../../constants';

const {Text} = Typography;
const { useToken } = theme;


type Props = {
    resource:string,
    headerTitle:string,
    subTitle?:string
    isLoading:boolean,
    data: Data [],

}

type Data = {
    id:number 
    attributes: Attribute
}

type Attribute = {
    date: string,
    value:number,
    category:string,
    publishedAt?:string
}


const getIconComponent = (resource:string) => {
    switch (resource) {
      case 'Incident':
        return IncidentIcon;
      case 'Accident':
        return AccidentIcon;
      case 'Dtp':
        return DtpIcon;
      default:
        return null;
    }
  }

  const transformData = (data: Data[]): Attribute[] => {
    const groupedData: { [category: string]: Attribute } = {};

    data && data.forEach(({ attributes }) => {
        const { category, value, date } = attributes;
        const formattedDate = dayjs(date,'DD.MM.YYYY').format('DD.MM.YYYY'); 
        if (!groupedData[category]) {
            groupedData[category] = { date:formattedDate, value, category };
        } else {
            groupedData[category].value += value;
        }
    });

    return Object.values(groupedData);
};



export const KpiListCard: React.FC<Props> = ({
    resource,
    headerTitle,
    subTitle,
    isLoading,
    data
}) => {

    let updatedDate = '';
    if (data && data.length > 0) {
        updatedDate = dayjs(data[0].attributes.publishedAt).format(DATE_FULL_FORMAT);
    }
    const cleanedChartData = data && data.map((item) => {
        return {
            date: dayjs(item.attributes.date).format(DATE_FORMAT),
            value: item.attributes.value,
            category: item.attributes.category
        };
    });
    const attributesArray = transformData(data);
    const { token } = useToken();
    const IconComponent = getIconComponent(resource);
    const translate = useTranslate();


  return (
    <ProCard   
        loading={isLoading}   
        title={<Text style={{fontSize:'12px', display:'flex',alignItems:'center'}}>
            {IconComponent && <Icon component={IconComponent} style={{ fontSize: '24px', marginRight: '5px',color:'#FFFFFF' }} />}
            {headerTitle}
            { subTitle &&  <Text style={{fontSize:'9px',fontWeight:'normal',marginLeft:'3px'}}>{subTitle}</Text>}
            {<SimpleModal title='Axon' isAxon={true}/>}   
        </Text>}
        subTitle={subTitle}
        extra={<SimpleModal title='Данные' tableData={cleanedChartData as any} updated={updatedDate}/>}
        style={{
            //minHeight:'170px'
        }}
        boxShadow
        bodyStyle={{
            paddingInline:'8px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%' 
        }}
        headStyle={{
            paddingInline:'8px'
        }}
        headerBordered
    >
        {attributesArray && attributesArray.length > 0 ? (
            <List >
                    {attributesArray && attributesArray.map((attribute, index) => (
                        <List.Item key={index} style={{
                            height:'35px',
                            backgroundColor: index % 2 === 1 ? token.colorBgBase : 'transparent' 
                        }}>
                            <div style={{
                                width:'100%',
                                display:'flex',
                                justifyContent:'space-between',
                                paddingLeft:'5px',
                                paddingRight:'5px',
                            
                            }}>
                                <Typography.Text style={{flex:1,color:token.colorFillTertiary}}>{attribute.category}</Typography.Text>
                                <Typography.Text strong 
                                style={{
                                    color:attribute.category==="Летальный исход"?'#FC6363': token.colorFillTertiary,
                                    fontSize:token.fontSizeLG
                                }} >
                                    {attribute.value}
                                </Typography.Text>
                            </div>                            
                        </List.Item>
                    ))}
            </List>
        ) : 
        (
            <List >
                <List.Item key={1} style={{
                    height:'35px',
                    //backgroundColor: 1 % 2 === 1 ? token.colorBgBase : 'transparent' 
                }}>
                    <div style={{
                        width:'100%',
                        display:'flex',
                        justifyContent:'space-between',
                        paddingLeft:'5px',
                        paddingRight:'5px',
                    
                    }}>
                        <Typography.Text style={{flex:1,color:token.colorFillTertiary, fontSize:token.fontSizeLG}}>
                            {translate("performance.total", "Всего")}
                        </Typography.Text>
                        <Typography.Text strong 
                                style={{
                                    color:token.colorFillTertiary,
                                    fontSize:token.fontSizeLG
                                }} >
                                    0
                                </Typography.Text>
                    </div>                            
                </List.Item>   
            </List>
        )}
    </ProCard>
  )
}
