import React, {useContext,useState} from "react";
import {Layout, Row,Col,DatePicker,Space,Switch,Typography,Progress,List,theme } from "antd";
import locale from 'antd/es/date-picker/locale/ru_RU';
import {CaretUpOutlined,CaretDownOutlined,CaretRightOutlined } from '@ant-design/icons';
import {
    ProCard
  } from '@ant-design/pro-components';
  import { ColorModeContext } from "../../contexts/color-mode";
  import { Bar,Column } from '@ant-design/plots';



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

  const topColResponsiveProps2 = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 12,
    style: { marginBottom: 24, display: 'flex' },
  };

  const data = [
    {
      label: 'ТОО “Тенгизшевройл”',
      type: 'Факт',
      value: 27515,
    },
    {
      label: 'ТОО “Тенгизшевройл”',
      type: 'План',
      value: 28413,
    },
    {
      label: 'Норт Каспиан Оперейтинг Компани н.в.',
      type: 'Факт',
      value: 23677,
    },
    {
      label: 'Норт Каспиан Оперейтинг Компани н.в.',
      type: 'План',
      value: 24868,
    },
    {
      label: 'Карачаганак Петролеум Оперейтинг б.в.',
      type: 'Факт',
      value: 10377,
    },
    {
      label: 'Карачаганак Петролеум Оперейтинг б.в.',
      type: 'План',
      value: 10269,
    },
    {
      label: 'АО “Мангистаумунайгаз”',
      type: 'Факт',
      value: 6042,
    },
    {
      label: 'АО “Мангистаумунайгаз”',
      type: 'План',
      value: 6048,
    },
     {
      label: 'АО “ОзенМунайГаз”',
      type: 'Факт',
      value: 5297,
    },
    {
      label: 'АО “ОзенМунайГаз”',
      type: 'План',
      value: 5256,
    },
    {
      label: 'АО “Эмбамунайгаз”',
      type: 'Факт',
      value: 2758,
    },
    {
      label: 'АО “Эмбамунайгаз”',
      type: 'План',
      value: 2776,
    },
  ];
  const uniqueLabels = [...new Set(data.map(item => item.label))];
  const config = {
    data,
    isGroup: true,
    xField: 'value',
    yField: 'label',
    seriesField: 'type',
    dodgePadding: 4,
    label: {
      position: 'right',
    },
    annotations: uniqueLabels.map((label, index) => ({
        type: 'line',
        start: ['0%', `${(index * 100) / uniqueLabels.length}%`],
        end: ['100%', `${(index * 100) / uniqueLabels.length}%`],
        style: {
          stroke: '#ccc',
          lineWidth: 1
        }
      })),  
    color: ['#48BB78', '#3182CE'],
    legend: {
    position: 'bottom', // Sets the legend at the bottom
    },
  };






export const Indicator: React.FC = () => {
    const { token } = useToken();
    const { mode } = useContext(ColorModeContext);
    const listRowColor = mode=='light'? '#F7FAFC':'#11242D';
    const firstRowBgColor = mode=='light'? '#0B5396':'#172C35';
    const firstRowBorderColor = mode=='light'? '#5095D5':'#172C35';
    const [tab, setTab] = useState('tab1');
    

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
                        title={<Text><img src="/images/icons/tranportirovka.svg" style={{paddingRight:'5px'}}/>Транспортировка</Text>}
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
            <Row gutter={24} style={{ marginTop: '20px', display: 'flex'}}>
                <Col {...topColResponsiveProps2}>
                
                <ProCard
                    boxShadow
                    tabs={{
                    activeKey: tab,  
                    destroyInactiveTabPane: true,        
                    items: [
                        {
                          label: `Добыча нефти`,
                          key: 'tab1',
                          icon:<img src="/images/icons/dobycha.svg" style={{width:'20px'}}/>,
                          children: <Bar {...config}  />                       
                        },
                        {
                          label: `Транспортировка нефти`,
                          key: 'tab2',
                          icon:<img src="/images/icons/pererabotka.svg" style={{width:'20px'}}/>,
                          children: <Bar {...config}  /> 
                        },
                        {
                          label: `Переработка нефти`,
                          key: 'tab3',
                          icon:<img src="/images/icons/tranportirovka.svg" style={{width:'20px'}}/>,
                          children: <Bar {...config}  /> 
                        },
                      ],
                    onChange: (key) => {
                        setTab(key);
                    },
                    }}
                />
                </Col>
                <Col xs={24} xl={12} style={{ marginBottom: 24, display: 'flex',flexDirection:'column' }} >
                    <ProCard      
                            title={<Text><img src="/images/icons/purchase.svg" style={{paddingRight:'5px'}}/>План закупок группы КМГ</Text>}
                            //headerBordered
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
                            <Column {...configZakupki} />
                    </ProCard>
                    <Row gutter={12} style={{ marginTop: '20px', display: 'flex',justifyContent:'space-between'}}>
                    <Col style={{display:'flex', flex:'1'}}>
                        <ProCard      
                            title={<Text ><img src="/images/icons/incident.svg" style={{paddingRight:'5px'}}/>Инциденты</Text>}
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
                                        <Typography.Text  style={{flex:1,color:'#718096'}}>Всего</Typography.Text>
                                        <Typography.Text strong style={{color:'#718096',fontSize:'larger'}} >
                                            183
                                        </Typography.Text>
                                        
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
                                        <Typography.Text  style={{flex:1,color:'#718096'}}>Происшествия</Typography.Text>
                                        <Typography.Text strong style={{color:'#718096',fontSize:'larger'}} >
                                           170
                                        </Typography.Text>
                                        
                                    </div>                            
                                </List.Item>
                                <List.Item style={{backgroundColor:listRowColor,height:'35px'}}>
                                    <div  style={{
                                        width:'100%',
                                        display:'flex',
                                        justifyContent:'space-between',
                                        paddingLeft:'5px',
                                        paddingRight:'5px'
                                    }}>
                                        <Typography.Text  style={{flex:1,color:'#718096'}}>Правонарушения</Typography.Text>
                                        <Typography.Text strong style={{color:'#718096',fontSize:'larger'}} >
                                            183
                                        </Typography.Text>
                                        
                                    </div>                            
                                </List.Item>
                            </List>
                        </ProCard>
                    </Col>
                    <Col style={{display:'flex', flex:'1'}}>
                        <ProCard      
                            title={<Text ><img src="/images/icons/accident.svg" style={{paddingRight:'5px'}}/>Несчастные случаи</Text>}
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
                                        <Typography.Text  style={{flex:1,color:'#718096'}}>Всего</Typography.Text>
                                        <Typography.Text strong style={{color:'#718096',fontSize:'larger'}} >
                                            24
                                        </Typography.Text>
                                        
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
                                        <Typography.Text  style={{flex:1,color:'#718096'}}>Летальный исход</Typography.Text>
                                        <Typography.Text strong style={{color:'#FC6363',fontSize:'larger'}} >
                                            2
                                        </Typography.Text>
                                        
                                    </div>                            
                                </List.Item>
                            </List>
                        </ProCard>
                    </Col>
                    <Col style={{display:'flex', flex:'1'}}>
                        <ProCard      
                            title={<Text><img src="/images/icons/dtp.svg" style={{paddingRight:'5px'}}/>ДТП</Text>}
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
                                        <Typography.Text  style={{flex:1,color:'#718096'}}>Всего</Typography.Text>
                                        <Typography.Text strong style={{color:'#718096',fontSize:'larger'}} >
                                            17
                                        </Typography.Text>
                                        
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
                                        <Typography.Text  style={{flex:1,color:'#718096'}}>Летальный исход</Typography.Text>
                                        <Typography.Text strong style={{color:'#FC6363',fontSize:'larger'}} >
                                            1
                                        </Typography.Text>
                                        
                                    </div>                            
                                </List.Item>
                            </List>
                        </ProCard>
                    </Col>
                </Row>
                
                </Col>
            </Row>
        </Layout>

    );
};