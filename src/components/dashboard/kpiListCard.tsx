import { ProCard } from '@ant-design/pro-components'
import React from 'react'
import { Empty, List, Typography, theme } from 'antd'
import Icon from '@ant-design/icons';
import IncidentIcon from '../../assets/icons/incident.svg?react';
import AccidentIcon from '../../assets/icons/accident.svg?react';
import DtpIcon from '../../assets/icons/dtp.svg?react';
import { SimpleModal } from './simpleModal';
import {useTranslate} from '@refinedev/core';

const {Text, Link} = Typography;
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
    category:string
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
        if (!groupedData[category]) {
            groupedData[category] = { date, value, category };
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

    const attributesArray = transformData(data);
    const tableData = data && data.map(item => item.attributes);
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
        extra={<SimpleModal title='Данные' tableData={tableData as any}/>}

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
        <Typography.Text style={{fontSize:token.fontSizeSM, textAlign:'center'}}>
            <Text type="warning">{translate("performance.noDataPeriod", "")}</Text>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{height:'30px',marginBlock:'30px'}} />
        </Typography.Text>
        )}
    </ProCard>
  )
}
