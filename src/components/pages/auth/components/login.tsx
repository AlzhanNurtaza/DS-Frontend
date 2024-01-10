import React from "react";
import {
  LoginPageProps,
  LoginFormTypes,
  useActiveAuthProvider,
  useLogin,
  useTranslate,
} from "@refinedev/core";
import {
  bodyStyles,
  containerStyles,
  headStyles,
  layoutStyles,
  titleStyles,
} from "./styles";
import {
  Row,
  Col,
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  CardProps,
  LayoutProps,
  Divider,
  FormProps,
  theme,
  Space,
} from "antd";

import { HeaderCustom } from "../../../../components/header/headerCustom";
import {Footer} from "../../../footer/footer"

const { Text, Title } = Typography;
const { useToken } = theme;

type LoginProps = LoginPageProps<LayoutProps, CardProps, FormProps>;
/**
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#login} for more details.
 */
export const LoginPage: React.FC<LoginProps> = ({
  providers,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
  hideForm,
}) => {
  const { token } = useToken();
  const [form] = Form.useForm<LoginFormTypes>();
  const translate = useTranslate();


  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  

  const PageTitle =
    title === false ? null : (
      <Col
        style={{
          display: "flex",
          flexDirection:"column",
          justifyContent: "center",
          //marginBottom: "32px",
          alignItems:"center",
          minHeight:"150px"
        }}
      >
        <Space  style={{maxWidth:'400px', textAlign:'center'}}>
          <Text style={{
            fontSize:token.fontSizeHeading5,
            color:token.colorWhite,
          }}>{translate("pages.login.desc", "")}</Text>
        </Space>

      </Col>
    );

  const CardTitle = (
    <Title

      level={3}
      style={{
        color: token.colorText,
        ...titleStyles,
      }}
    >
      {translate("pages.login.title", "Sign in to your account")}
    </Title>
  );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          {providers.map((provider) => {
            return (
              <Button
                key={provider.name}
                type="default"
                block
                icon={provider.icon}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "8px",
                }}
                onClick={() =>
                  login({
                    providerName: provider.name,
                  })
                }
              >
                {provider.label}
              </Button>
            );
          })}
          {!hideForm && (
            <Divider>
              <Text
                style={{
                  color: token.colorTextLabel,
                }}
              >
                {translate("pages.login.divider", "or")}
              </Text>
            </Divider>
          )}
        </>
      );
    }
    return null;
  };

  const CardContent = (
    <Card
      title={CardTitle}
      headStyle={headStyles}
      bodyStyle={bodyStyles}
      style={{
        ...containerStyles,
        backgroundColor: token.colorBgElevated,
      }}
      {...(contentProps ?? {})}
    >
      {renderProviders()}
      {!hideForm && (
        <Form<LoginFormTypes>
          layout="vertical"
          form={form}
          onFinish={(values) => login(values)}
          requiredMark={false}
          initialValues={{
            remember: false,
          }}
          {...formProps}
        >
          <Form.Item
            name="email"
            label={translate("pages.login.fields.email", "Email")}
            rules={[
              { required: true },
              {
                type: "email",
                message: translate(
                  "pages.login.errors.validEmail",
                  "Invalid email address"
                ),
              },
            ]}
          >
            <Input
              size="large"
              placeholder={translate("pages.login.fields.emailPlaceholder", "Email")}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={translate("pages.login.fields.password", "Password")}
            rules={[{ required: true }]}
          >
            <Input
              type="password"
              autoComplete="current-password"
              placeholder={translate("pages.login.fields.passwordPlaceholder", "*******")}
              size="large"
            />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            {rememberMe ?? (
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {translate("pages.login.buttons.rememberMe", "Remember me")}
                </Checkbox>
              </Form.Item>
            )}
          </div>
          {!hideForm && (
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={isLoading}
                block
              >
                {translate("pages.login.signin", "Sign in")}
              </Button>
            </Form.Item>
          )}
        </Form>
      )}
    </Card>
  );

  return (
    <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
      <Row>
        <Col
          style={{
            position:'absolute',
            padding:'10px',
            display:'flex',
            width:'100%',
            overflow:'hidden',
            height:'40vh',
          }}>
            <img src="/images/bg/bg1.png"  
              style={{
              width:'50%',
              borderRadius:'10px 0 0 10px',
              backgroundColor:'#32A1FF',
              
            }}/>
            
            <img src="/images/bg/bg2.png" alt="" 
            style={{
              backgroundColor:'#32A1FF',
              borderRadius:'0 10px 10px 0',
              width:'50%',
            }}
            />  
        </Col>


        <Col xs={0} lg={12} style={{
          position:'absolute',
          padding:'15px',
          zIndex:1,
        }}>
          <img src="/images/logo/logo-kmg.svg" style={{maxWidth:'180px  '}} />
        </Col>
        <Col xs={0} sm={24} style={{
          position:'absolute',
          padding:'20px',
          width:'100%',
          zIndex:1,
          textAlign:'center'
        }}>
          <img  src="/images/logo/logo-ds.svg" style={{maxWidth:'40%'}} />
        </Col>
      </Row>
      <HeaderCustom />
      <Row
      
        justify="center"
        align={hideForm ? "top" : "middle"}
        style={{
          padding: "16px 0",
          minHeight: "100dvh",
          paddingTop: hideForm ? "15dvh" : "16px",
          backgroundImage:'url(/images/bg/bg-login.svg)',
          backgroundRepeat:'no-repeat',
          backgroundPosition: 'bottom',
          backgroundSize: '100% 70%'
        }}
      >
       
        <Col xs={22}>
          {renderContent ? (
            renderContent(CardContent, PageTitle)
          ) : (
            <>
             
              {PageTitle}
              {CardContent}
            </>
          )}
        </Col>
        <Footer />
      </Row>
      
    </Layout>
  );
};
