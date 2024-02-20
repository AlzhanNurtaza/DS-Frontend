import React, { useState } from 'react';
import { Modal, Button, Typography, Descriptions } from 'antd';
import { useTranslate } from '@refinedev/core';
import Icon from '@ant-design/icons';
import ExclamantionIcon from '../../assets/icons/exclamation.svg?react';
import { AxonAttribute } from '../../common';

const {Link, Text} = Typography;

type Props = {
    title?:string,
    updated?:string,
    axonDataAttribute?:AxonAttribute
}

export const AxonModal: React.FC<Props> = ({
    title="Axon",
    updated,
    axonDataAttribute
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
        //width='70%'
        footer={[
          <Button key="back" onClick={handleClose}>
            {translate("performance.close", "Закрыть")}
          </Button>
        ]}
      >
        {axonDataAttribute ? (
          <Descriptions>
            <Descriptions.Item label={translate("performance.axon.refNumber", "refNumber")} >{axonDataAttribute.refNumber}</Descriptions.Item>
            <Descriptions.Item label={translate("performance.axon.Name", "Name")}>{axonDataAttribute.name}</Descriptions.Item>
            <Descriptions.Item label={translate("performance.axon.System", "System")}>{axonDataAttribute.systemName}</Descriptions.Item>
            <Descriptions.Item label={translate("performance.axon.Description", "Description")}>{axonDataAttribute.description}</Descriptions.Item>
          </Descriptions>
        ) : (
          <Text type="warning">Нет данных Axon</Text>
        )}
        {updated && (translate("performance.updated", "Обновление")+" " + updated) } 
      </Modal>
    </>
  );
};

