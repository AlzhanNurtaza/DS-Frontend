import {Layout, Row,Col,DatePicker,Space,Switch,Typography } from "antd";
import locale from 'antd/es/date-picker/locale/ru_RU';
import {CaretUpOutlined,CaretDownOutlined } from '@ant-design/icons';


const { Text } = Typography;


export const Indicator: React.FC = () => {


    return (
        <Layout>
            <Row style={{
                display:'flex'
            }}>
                <Col style={{
                display:'flex'
            }}>
                    <Space direction="horizontal" style={{
                        backgroundColor: '#0B5396',
                        padding: '5px',
                        borderRadius: '5px',
                        margin:'5px',
                        border:'1px solid #5095D5',
                    }}>
                        <Text style={{color:'white'}}>Без доли</Text>
                        <Switch />
                        <Text style={{color:'white'}}>Дата</Text>
                        <DatePicker locale={locale} />
                    </Space>
                </Col>
                <Col style={{
                display:'flex'
            }}>  
                <Space direction="horizontal" style={{
                        backgroundColor: '#0B5396',
                        padding: '5px',
                        borderRadius: '5px',
                        margin:'5px',
                        border:'1px solid #5095D5',
                        
                    }}>
                        <Text style={{color:'white'}} strong>Котировки:</Text>
                        <Text style={{color:'white'}} strong>$ 439,11 <CaretDownOutlined style={{color:'#FC6363'}}/></Text>
                        <Text style={{color:'white'}} strong>€ 492,68 <CaretDownOutlined style={{color:'#FC6363'}}/></Text>
                        <Text style={{color:'white'}} strong>₽ 5,06 <CaretUpOutlined style={{color:'#48BB78'}}/></Text>
                    </Space>         
                </Col>
                <Col style={{
                display:'flex'
            }}>  
                <Space direction="horizontal" style={{
                        backgroundColor: '#0B5396',
                        padding: '5px',
                        borderRadius: '5px',
                        margin:'5px',
                        border:'1px solid #5095D5',
                    }}>
                        <Text style={{color:'white'}} strong>Акции:</Text>
                        <Text style={{color:'white'}} strong><span style={{fontWeight:'normal'}}>КМГ, KASE</span> 11 909,99<CaretUpOutlined style={{color:'#48BB78'}}/></Text>
                        <Text style={{color:'white'}} strong><span style={{fontWeight:'normal'}}>КМГ, AIX</span> 11 447,00<CaretUpOutlined style={{color:'#48BB78'}}/></Text>
                    </Space>         
                </Col>
            </Row>
        </Layout>

    );
};