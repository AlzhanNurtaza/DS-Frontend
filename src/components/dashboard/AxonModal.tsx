import React, { useState } from 'react';
import { Modal, Button, Typography } from 'antd';
import { useTranslate } from '@refinedev/core';
import Icon from '@ant-design/icons';
import ExclamantionIcon from '../../assets/icons/exclamation.svg?react';

const {Link, Text} = Typography;

type Props = {
    title?:string,
    updated?:string
}




export const AxonModal: React.FC<Props> = ({
    title="Axon",
    updated,
}) => {
  const translate = useTranslate();
  const [isModalVisible, setIsModalVisible] = useState(false);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Link href='#' onClick={showModal}  style={{marginBottom:'5px', marginLeft:'5px'}}>
            {<Icon component={ExclamantionIcon}  />}
      </Link>
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
        
        <Text type="warning">Нет данных по Axon</Text>
        {updated && (translate("performance.updated", "Обновление")+" " + updated) } 
      </Modal>
    </>
  );
};

