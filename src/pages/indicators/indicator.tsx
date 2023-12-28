import React, {useContext} from "react";
import {Layout, Row,Col,DatePicker,Space,Switch,Typography,Progress,List,theme } from "antd";
import locale from 'antd/es/date-picker/locale/ru_RU';
import {CaretUpOutlined,CaretDownOutlined,CaretRightOutlined } from '@ant-design/icons';
import {
    ProCard
  } from '@ant-design/pro-components';
  import { ColorModeContext } from "../../contexts/color-mode";



const { useToken } = theme;
const { Text,Link } = Typography;

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24, display: 'flex' },
  };


export const Indicator: React.FC = () => {
    const { token } = useToken();
    const { mode } = useContext(ColorModeContext);
    const listRowColor = mode=='light'? '#F7FAFC':'#11242D';
    const firstRowBgColor = mode=='light'? '#0B5396':'#172C35';
    const firstRowBorderColor = mode=='light'? '#5095D5':'#172C35';
    

    return (
        <Layout>
            <Row style={{
                display:'flex'
            }}>
                <Col style={{
                display:'flex'
            }}>
                    <Space direction="horizontal" style={{
                        backgroundColor: firstRowBgColor,
                        padding: '5px ',
                        borderRadius: '5px',
                        margin:'5px 0',
                        border:`1px solid ${firstRowBorderColor}`,
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
                        backgroundColor: firstRowBgColor,
                        padding: '5px',
                        borderRadius: '5px',
                        margin:'5px',
                        border:`1px solid ${firstRowBorderColor}`,
                        
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
                        backgroundColor: firstRowBgColor,
                        padding: '5px',
                        borderRadius: '5px',
                        margin:'5px',
                        border:`1px solid ${firstRowBorderColor}`,
                    }}>
                        <Text style={{color:'white'}} strong>Акции:</Text>
                        <Text style={{color:'white'}} strong><span style={{fontWeight:'normal'}}>КМГ, KASE</span> 11 909,99<CaretUpOutlined style={{color:'#48BB78'}}/></Text>
                        <Text style={{color:'white'}} strong><span style={{fontWeight:'normal'}}>КМГ, AIX</span> 11 447,00<CaretUpOutlined style={{color:'#48BB78'}}/></Text>
                    </Space>         
                </Col>
            </Row>
            <Row gutter={24} style={{ marginTop: '20px', display: 'flex'}}>
                <Col {...topColResponsiveProps}>
                    <ProCard      
                        title={<Text><img src="/images/icons/dobycha.svg" style={{paddingRight:'5px'}}/>Добыча нефти</Text>}
                        //headerBordered
                        subTitle="тыс.тон"
                        extra={<Link href="#" style={{fontSize:"x-small"}}>ОТКРЫТЬ</Link>}
                        tooltip="Совет Совет"
                        boxShadow
                        bodyStyle={{
                            paddingInline:'8px'
                        }}
                        headStyle={{
                            paddingInline:'8px'
                        }}
                    >
                        <List>
                            <List.Item style={{backgroundColor:listRowColor}}>
                                <div  style={{
                                    width:'100%',
                                    display:'flex',
                                    justifyContent:'space-between',
                                    paddingLeft:'5px',
                                    paddingRight:'5px'
                                }}>
                                    <Typography.Text  style={{flex:1,color:'#718096'}}>Факт</Typography.Text>
                                    <Typography.Text strong style={{flex:1,color:'#48BB78',fontSize:'larger'}} ><CaretUpOutlined style={{color:'#48BB78'}}/> 11 200</Typography.Text>
                                    <div style={{flex:1}}><Progress percent={100} /> </div>
                                    
                                </div>                            
                            </List.Item>
                            <List.Item>
                                <div  style={{
                                    width:'100%',
                                    display:'flex',
                                    justifyContent:'space-between',
                                    paddingLeft:'5px',
                                    paddingRight:'5px'
                                }}>
                                    <Typography.Text  style={{flex:1,color:'#718096'}}>План</Typography.Text>
                                    <Typography.Text strong style={{flex:1,color:'#718096',fontSize:'larger'}} ><CaretRightOutlined  style={{color:'#718096'}}/> 10 152</Typography.Text>
                                    <div style={{flex:1}}><Progress percent={100} /> </div>
                                    
                                </div>                            
                            </List.Item>
                            <List.Item style={{backgroundColor:listRowColor}}>
                                <div  style={{
                                    width:'100%',
                                    display:'flex',
                                    justifyContent:'space-between',
                                    paddingLeft:'5px',
                                    paddingRight:'5px'
                                }}>
                                    <Typography.Text  style={{flex:1,color:'#718096'}}>Отклонение</Typography.Text>
                                    <Typography.Text strong style={{flex:1,color:'#718096',fontSize:'larger'}} ><CaretRightOutlined  style={{color:'#718096'}}/> 506</Typography.Text>
                                    <div style={{flex:1}}><Progress percent={3} strokeColor="#ED8936" /> </div>
                                    
                                </div>                            
                            </List.Item>
                            <List.Item>
                                <div  style={{
                                    width:'100%',
                                    display:'flex',
                                    justifyContent:'space-between',
                                    paddingLeft:'5px',
                                    paddingRight:'5px'
                                }}>
                                    <Typography.Text  style={{flex:1,color:'#718096'}}>Исполнение</Typography.Text>
                                    <Typography.Text strong style={{flex:1,color:'#FC6363',fontSize:'larger'}} ><CaretDownOutlined  style={{color:'#FC6363'}}/>1 020</Typography.Text>
                                    <div style={{flex:1}}><Progress percent={10} strokeColor="#FC6363" /> </div>
                                    
                                </div>                            
                            </List.Item>
                        </List>
                    </ProCard>
                </Col>
                <Col {...topColResponsiveProps}>
                    <ProCard      
                        title={<Text><img src="/images/icons/pererabotka.svg" style={{paddingRight:'5px'}}/>Переработка нефти</Text>}
                        subTitle="тыс.тон"
                        extra={<Link href="#" style={{fontSize:"x-small"}}>ОТКРЫТЬ</Link>}
                        tooltip="Совет Совет"
                        boxShadow
                        bodyStyle={{
                            paddingInline:'8px'
                        }}
                        headStyle={{
                            paddingInline:'8px'
                        }}
                    >
                        <List>
                            <List.Item style={{backgroundColor:listRowColor}}>
                                <div  style={{
                                    width:'100%',
                                    display:'flex',
                                    justifyContent:'space-between',
                                    paddingLeft:'5px',
                                    paddingRight:'5px'
                                }}>
                                    <Typography.Text  style={{flex:1,color:'#718096'}}>Факт</Typography.Text>
                                    <Typography.Text strong style={{flex:1,color:'#48BB78',fontSize:'larger'}} >
                                        <CaretUpOutlined style={{color:'#48BB78'}}/> 12 500
                                    </Typography.Text>
                                    <div style={{flex:1}}><Progress percent={100} /> </div>
                                    
                                </div>                            
                            </List.Item>
                            <List.Item>
                                <div  style={{
                                    width:'100%',
                                    display:'flex',
                                    justifyContent:'space-between',
                                    paddingLeft:'5px',
                                    paddingRight:'5px'
                                }}>
                                    <Typography.Text  style={{flex:1,color:'#718096'}}>План</Typography.Text>
                                    <Typography.Text strong style={{flex:1,color:'#718096',fontSize:'larger'}} >
                                        <CaretRightOutlined  style={{color:'#718096'}}/>11 435
                                    </Typography.Text>
                                    <div style={{flex:1}}><Progress percent={100} /> </div>
                                    
                                </div>                            
                            </List.Item>
                            <List.Item style={{backgroundColor:listRowColor}}>
                                <div  style={{
                                    width:'100%',
                                    display:'flex',
                                    justifyContent:'space-between',
                                    paddingLeft:'5px',
                                    paddingRight:'5px'
                                }}>
                                    <Typography.Text  style={{flex:1,color:'#718096'}}>Отклонение</Typography.Text>
                                    <Typography.Text strong style={{flex:1,color:'#718096',fontSize:'larger'}} >
                                        <CaretRightOutlined  style={{color:'#718096'}}/>213</Typography.Text>
                                    <div style={{flex:1}}><Progress percent={3} strokeColor="#ED8936" /> </div>
                                    
                                </div>                            
                            </List.Item>
                            <List.Item>
                                <div  style={{
                                    width:'100%',
                                    display:'flex',
                                    justifyContent:'space-between',
                                    paddingLeft:'5px',
                                    paddingRight:'5px'
                                }}>
                                    <Typography.Text  style={{flex:1,color:'#718096'}}>Исполнение</Typography.Text>
                                    <Typography.Text strong style={{flex:1,color:'#FC6363',fontSize:'larger'}} >
                                        <CaretDownOutlined  style={{color:'#FC6363'}}/>918</Typography.Text>
                                    <div style={{flex:1}}><Progress percent={10} strokeColor="#FC6363" /></div>
                                    
                                </div>                            
                            </List.Item>
                        </List>
                    </ProCard>
                </Col>
                <Col {...topColResponsiveProps}>
                    <ProCard      
                        title={<Text><img src="/images/icons/tranportirovka.svg" style={{paddingRight:'5px'}}/>Транпортировка</Text>}
                        subTitle="тыс.тон"
                        extra={<Link href="#" style={{fontSize:"x-small"}}>ОТКРЫТЬ</Link>}
                        tooltip="Совет Совет"
                        boxShadow
                        bodyStyle={{
                            paddingInline:'8px'
                        }}
                        headStyle={{
                            paddingInline:'8px'
                        }}
                    >
                        <List>
                            <List.Item style={{backgroundColor:listRowColor}}>
                                <div  style={{
                                    width:'100%',
                                    display:'flex',
                                    justifyContent:'space-between',
                                    paddingLeft:'5px',
                                    paddingRight:'5px'
                                }}>
                                    <Typography.Text  style={{flex:1,color:'#718096'}}>Факт</Typography.Text>
                                    <Typography.Text strong style={{flex:1,color:'#48BB78',fontSize:'larger'}} >
                                        <CaretUpOutlined style={{color:'#48BB78'}}/>9 700
                                    </Typography.Text>
                                    <div style={{flex:1}}><Progress percent={100} /> </div>
                                    
                                </div>                            
                            </List.Item>
                            <List.Item>
                                <div  style={{
                                    width:'100%',
                                    display:'flex',
                                    justifyContent:'space-between',
                                    paddingLeft:'5px',
                                    paddingRight:'5px'
                                }}>
                                    <Typography.Text  style={{flex:1,color:'#718096'}}>План</Typography.Text>
                                    <Typography.Text strong style={{flex:1,color:'#718096',fontSize:'larger'}} >
                                        <CaretRightOutlined  style={{color:'#718096'}}/>12 152
                                    </Typography.Text>
                                    <div style={{flex:1}}><Progress percent={100} /> </div>
                                    
                                </div>                            
                            </List.Item>
                            <List.Item style={{backgroundColor:listRowColor}}>
                                <div  style={{
                                    width:'100%',
                                    display:'flex',
                                    justifyContent:'space-between',
                                    paddingLeft:'5px',
                                    paddingRight:'5px'
                                }}>
                                    <Typography.Text  style={{flex:1,color:'#718096'}}>Отклонение</Typography.Text>
                                    <Typography.Text strong style={{flex:1,color:'#718096',fontSize:'larger'}} >
                                        <CaretRightOutlined  style={{color:'#718096'}}/>468</Typography.Text>
                                    <div style={{flex:1}}><Progress percent={3} strokeColor="#ED8936" /> </div>
                                    
                                </div>                            
                            </List.Item>
                            <List.Item>
                                <div  style={{
                                    width:'100%',
                                    display:'flex',
                                    justifyContent:'space-between',
                                    paddingLeft:'5px',
                                    paddingRight:'5px'
                                }}>
                                    <Typography.Text  style={{flex:1,color:'#718096'}}>Исполнение</Typography.Text>
                                    <Typography.Text strong style={{flex:1,color:'#FC6363',fontSize:'larger'}} >
                                        <CaretDownOutlined  style={{color:'#FC6363'}}/>514</Typography.Text>
                                    <div style={{flex:1}}><Progress percent={10} strokeColor="#FC6363" /></div>
                                    
                                </div>                            
                            </List.Item>
                        </List>
                    </ProCard>
                </Col>
                <Col {...topColResponsiveProps}>
                    <ProCard.Group direction="column">
                        <ProCard      
                            title={<Text><img src="/images/icons/dengi.svg" style={{paddingRight:'5px'}}/>Денежные средства</Text>}
                            subTitle="млрд."
                            extra={<Link href="#" style={{fontSize:"x-small"}}>ОТКРЫТЬ</Link>}
                            tooltip="Совет Совет"
                            boxShadow
                            bodyStyle={{
                                paddingInline:'8px'
                            }}
                            headStyle={{
                                paddingInline:'8px'
                            }}
                        >
                            <List>
                                <List.Item style={{backgroundColor:listRowColor,height:'35px'}}>
                                    <div  style={{
                                        width:'100%',
                                        display:'flex',
                                        justifyContent:'space-between',
                                        paddingLeft:'5px',
                                        paddingRight:'5px'
                                    }}>
                                        <Typography.Text  style={{flex:1,color:'#718096'}}>Факт</Typography.Text>
                                        <Typography.Text strong style={{flex:1,color:'#48BB78',fontSize:'larger'}} >
                                            <CaretUpOutlined style={{color:'#48BB78'}}/>10 121
                                        </Typography.Text>
                                        <div style={{flex:1}}><Progress percent={100} /> </div>
                                        
                                    </div>                            
                                </List.Item>
                                <List.Item style={{height:'35px'}}>
                                    <div  style={{
                                        width:'100%',
                                        display:'flex',
                                        justifyContent:'space-between',
                                        paddingLeft:'5px',
                                        paddingRight:'5px'
                                    }}>
                                        <Typography.Text  style={{flex:1,color:'#718096'}}>План</Typography.Text>
                                        <Typography.Text strong style={{flex:1,color:'#718096',fontSize:'larger'}} >
                                            <CaretRightOutlined  style={{color:'#718096'}}/>9 137
                                        </Typography.Text>
                                        <div style={{flex:1}}><Progress percent={91} /> </div>
                                        
                                    </div>                            
                                </List.Item>
                            </List>
                        </ProCard>
                        <ProCard      
                            title={<Text><img src="/images/icons/dohod.svg" style={{paddingRight:'5px'}}/>Чистый доход/убыток</Text>}
                            //subTitle="млрд."
                            extra={<Link href="#" style={{fontSize:"x-small"}}>ОТКРЫТЬ</Link>}
                            tooltip="Совет Совет"
                            boxShadow
                            bodyStyle={{
                                paddingInline:'8px'
                            }}
                            headStyle={{
                                paddingInline:'8px'
                            }}
                        >
                            <List>
                                <List.Item style={{backgroundColor:listRowColor,height:'35px'}}>
                                    <div  style={{
                                        width:'100%',
                                        display:'flex',
                                        justifyContent:'space-between',
                                        paddingLeft:'5px',
                                        paddingRight:'5px'
                                    }}>
                                        <Typography.Text  style={{flex:1,color:'#718096'}}>Факт</Typography.Text>
                                        <Typography.Text strong style={{flex:1,color:'#FC6363',fontSize:'larger'}} >
                                            <CaretDownOutlined style={{color:'#FC6363'}}/>8 609
                                        </Typography.Text>
                                        <div style={{flex:1}}><Progress percent={90} strokeColor="#FC6363"/> </div>
                                        
                                    </div>                            
                                </List.Item>
                                <List.Item style={{height:'35px'}}>
                                    <div  style={{
                                        width:'100%',
                                        display:'flex',
                                        justifyContent:'space-between',
                                        paddingLeft:'5px',
                                        paddingRight:'5px'
                                    }}>
                                        <Typography.Text  style={{flex:1,color:'#718096'}}>План</Typography.Text>
                                        <Typography.Text strong style={{flex:1,color:'#718096',fontSize:'larger'}} >
                                            <CaretRightOutlined  style={{color:'#718096'}}/>9 137
                                        </Typography.Text>
                                        <div style={{flex:1}}><Progress percent={87} /> </div>
                                        
                                    </div>                            
                                </List.Item>
                            </List>
                        </ProCard>
                    </ProCard.Group>
                </Col>
            </Row>
        </Layout>

    );
};