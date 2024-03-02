import React from 'react';
import { Card, theme, Tooltip, Typography } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { DATE_FORMAT } from '../../constants';
import dayjs from 'dayjs';

const { useToken } = theme;
const { Text } = Typography;

type Props = {
    resource: string,
    title: string,
    data: Attribute[],
    isLoading: boolean
};

type Attribute = {
    id: number,
    attributes: Rate
};

type Rate = {
    date:string,
    category: string,
    value: string,
    arrow: string
};

export const ExchangeCard = ({
    resource,
    title,
    data,
    isLoading
}: Props) => {
  const { token } = useToken();


  const getUniqueData = (data: Attribute[]) => {
    const uniqueData = Array.from(new Map(data.map(item => {
      const key = `${item.attributes.category}-${item.attributes.value}-${item.attributes.arrow}`;
      return [key, item];
    })).values());
    return uniqueData;
  };

  const uniqueData = getUniqueData(data);

  return (
    <Card
      style={{
        backgroundColor: token.colorFillSecondary,
        border: `1px solid ${token.colorFillQuaternary}`,
        width: '100%',
      }}
      bodyStyle={{
        display: 'flex',      
        flexWrap: 'nowrap',   
        alignItems: 'center',
        padding: '6px 11px 6px',
        color: token.colorWhite,
        justifyContent: 'center',
        //maxHeight:'35px',
        //minHeight:'30px'
        height:'30px'
      }}
      loading={isLoading}
    >
      <Text style={{ color: token.colorWhite, marginRight: '6px', fontSize: 'small' }}>{title}</Text>
      {Array.isArray(uniqueData) && uniqueData.map((item, index) => (
        <Tooltip title={dayjs(item.attributes?.date).format(DATE_FORMAT)}>
          <Text 
            style={{ color: token.colorWhite, marginRight: '6px', fontSize: 'small' }} 
            key={index}
          >   {item.attributes?.category}
            <span style={{ marginLeft: '2px', fontWeight: '500' }}>{item.attributes?.value}</span>
            {item.attributes?.arrow === 'DOWN' ? 
              <CaretDownOutlined style={{ color: resource !== 'currency' ? '#FC6363' : '#48BB78' }}/> 
              : <CaretUpOutlined style={{ color: resource !== 'currency' ? '#48BB78' : '#FC6363' }}/>
            }
          </Text>
        </Tooltip>
      ))}
    </Card>
  );
};
