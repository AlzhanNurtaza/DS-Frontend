import React,{useContext} from "react";
import { ThemedLayoutContextProvider } from "@refinedev/antd";
import { ThemedHeaderV2 as DefaultHeader } from "./header";
import { ThemedSiderV2 as DefaultSider } from "./sider";
import { Grid, Layout as AntdLayout } from "antd";
import type { RefineThemedLayoutV2Props } from "@refinedev/antd";
import { ColorModeContext } from "../../contexts/color-mode";

export const ThemedLayoutV2: React.FC<RefineThemedLayoutV2Props> = ({
  children,
  Header,
  Sider,
  Title,
  Footer,
  OffLayoutArea,
  //initialSiderCollapsed,
}) => {
  const breakpoint = Grid.useBreakpoint();
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;
  const isSmall = typeof breakpoint.sm === "undefined" ? true : breakpoint.sm;
  const hasSider = !!SiderToRender({ Title });
  const { mode } = useContext(ColorModeContext);

  return (    
    <ThemedLayoutContextProvider initialSiderCollapsed={true}>
      <AntdLayout style={{ 
        minHeight: "100vh",
        backgroundImage:`url(${mode === 'light' ? '/images/bg/bg-pages.svg' : '/images/bg/bg-pages-dark.svg'})`,
        backgroundSize: '100%', 
        backgroundRepeat:'no-repeat',
        backgroundPosition: 'top center'
      }} hasSider={hasSider}>
        <SiderToRender Title={Title} />
        <AntdLayout style={{backgroundColor:'transparent'}}> 
          <HeaderToRender />
          <AntdLayout.Content style={{maxWidth:'2200px', marginLeft: 'auto', marginRight: 'auto',width:'100%' }} >
            <div
              style={{
                minHeight: 360,
                padding: isSmall ? 24 : 12,
              }}
            >
              {children}
            </div>
            {OffLayoutArea && <OffLayoutArea />}
          </AntdLayout.Content>
          {Footer && <Footer />}
        </AntdLayout>
      </AntdLayout>
    </ThemedLayoutContextProvider>
  );
};
