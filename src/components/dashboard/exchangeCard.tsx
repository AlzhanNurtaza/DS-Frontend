import React from 'react'
import {Card, theme, Typography} from 'antd'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const { useToken } = theme;
const {Text} = Typography;

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
    currency:string,
    value:string,
    arrow:string
}

export const ExchangeCard = ({
    resource,
    title,
    data,
    isLoading
}:Props) => {
  const { token } = useToken();
  return (
            <Card
            style={{
                backgroundColor: token.colorFillSecondary,
                border: `1px solid ${token.colorFillQuaternary}`,
                width: 'fit-content',
                maxHeight: '35px',
                minWidth: '300px'
            }}
            bodyStyle={{
                display: 'flex',      
                flexWrap: 'nowrap',   
                alignItems: 'center',
                padding: '6px 11px 6px',
                color: token.colorWhite,
                
            }}
            loading={isLoading}
        >
            <Text style={{ color: token.colorWhite, marginRight: '6px',fontSize:'small' }} strong>{title}</Text>
            {Array.isArray(data) && data.map((item, index) => (
                <Text 
                    style={{ color: token.colorWhite, marginRight: '6px',fontSize:'small' }} 
                    strong
                    key={index}
                >{item.attributes?.currency} {item.attributes?.value} 
                    {item.attributes?.arrow === 'DOWN' ? 
                    <CaretDownOutlined style={{ color: resource !== 'currency' ? '#FC6363' : '#48BB78' }}/> 
                    : <CaretUpOutlined style={{ color: resource !== 'currency' ? '#48BB78' : '#FC6363' }}/>}
                </Text>
            ))}
        </Card>

  )
}
