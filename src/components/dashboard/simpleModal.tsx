import React, { useState } from 'react';
import { Modal, Button, Typography, theme, Table } from 'antd';
import { useTranslate } from '@refinedev/core';
import Icon from '@ant-design/icons';
import ExclamantionIcon from '../../assets/icons/exclamation.svg?react';

const {Link, Text} = Typography;
const { useToken } = theme;

type Props = {
    title:string,
    tableData? : TableData[],
    isAxon?:boolean,
    updated?:string
}

type TableData = {
    date?:string,
    value?:number,
    value_coef?:number,
    category?:string,
    publishedAt?:string
}




export const SimpleModal: React.FC<Props> = ({
    title,
    tableData,
    isAxon = false,
    updated,
}) => {
  const { token } = useToken();
  const translate = useTranslate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const getColumns = (
    data?: TableData[]
  ): Array<{ title: string, dataIndex: keyof TableData, key: keyof TableData }> => {
    if (!data || data.length === 0) {
      return [];
    }
  
    const keys: Array<keyof TableData> = Object.keys(data[0]) as Array<keyof TableData>;
  
    return keys.map(key => ({
      title: translate("performance.modal.table." + key, key.charAt(0).toUpperCase() + key.slice(1)),
      dataIndex: key,
      key: key
    }));
  };
  const columns = getColumns(tableData);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };
  const dataSourceWithKeys = tableData?.map((item, index) => ({
    ...item,
    key: `row-${index}`, // Generating a unique key using the row index
  }));
  return (
    <>
      { isAxon ?
        (<Link href='#' onClick={showModal}  style={{marginBottom:'5px', marginLeft:'5px'}}>
            {<Icon component={ExclamantionIcon}  />}
        </Link>)
        :<Link style={{fontSize:'9px',color:token.colorTextQuaternary}} onClick={showModal} href='#'>
            {translate("performance.open", "ОТКРЫТЬ")}
        </Link>
      }
      <Modal
        title={title}
        open={isModalVisible}
        onCancel={handleClose}
        width='70%'
        footer={[
          <Button key="back" onClick={handleClose}>
            {translate("performance.close", "Закрыть")}
          </Button>
        ]}
      >
        
        {isAxon && <Text type="warning">Нет данных по Axon</Text>}
        { tableData && <Table dataSource={dataSourceWithKeys} columns={columns}  style={{overflow:'auto'}}/>}
        {updated && (translate("performance.updated", "Обновление")+" " + updated) } 
      </Modal>
    </>
  );
};

