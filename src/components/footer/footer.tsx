import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import {Layout,Row,Col,Space,Typography,theme} from "antd";
import { MailOutlined } from "@ant-design/icons";

const topColResponsiveProps = {
    xs: 24,
    sm: 8,
    style: { display: 'flex',
        alignTtems: 'center',
        justifyContent: 'center'

    },
  };

  const { useToken } = theme;

export const Footer: React.FC<RefineThemedLayoutV2HeaderProps> =() => {
    const { token } = useToken();
    const currentYear = new Date().getFullYear();

    return(
    <Layout.Footer
        style={{
            padding:0,
            margin:0,
            width:'100%'
        }}
    >
        <Row 
            style={{
                display:'flex',
                justifyContent:'space-between'
            }}
        >
            <Col {...topColResponsiveProps}>
            </Col>
            <Col {...topColResponsiveProps}>
                &copy; {currentYear} Сделано в kmg.kz
            </Col>
            <Col {...topColResponsiveProps}>
                <Typography.Link href="mailto:sms@kmg.kz" style={{color:token.colorTextBase}}>
                    <Space><MailOutlined /> Поддержка</Space>
                </Typography.Link>
                
            </Col >
        </Row>
    </Layout.Footer>
    )
    }

