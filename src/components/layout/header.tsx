import React, { useContext } from "react";
import {
  pickNotDeprecated,
  useActiveAuthProvider,
  useGetIdentity,
  useGetLocale,
  useSetLocale,
  useTranslate
} from "@refinedev/core";
import { Layout as AntdLayout, Typography, Avatar, Space, theme } from "antd";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";

import {
  Button,
  Dropdown,
  MenuProps,
  Switch,
} from "antd";
import { useTranslation } from "react-i18next";
import { DownOutlined } from "@ant-design/icons";
import { ColorModeContext } from "../../contexts/color-mode";




const { Text } = Typography;
const { useToken } = theme;

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
  sticky,
}) => {
  const { token } = useToken();
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const currentLocale = locale();
  const { mode, setMode } = useContext(ColorModeContext);
  const translate = useTranslate();


  const menuItems: MenuProps["items"] = [...(i18n.languages || [])]
  .sort()
  .map((lang: string) => ({
      key: lang,
      onClick: () => changeLanguage(lang),
      icon: (
          <span style={{ marginRight: 8 }}>
              <Avatar size={16} src={`/images/flags/${lang}.svg`} />
          </span>
      ),
      label: lang === "en" ? "English" : "Русский",
  }));

  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const shouldRenderHeader = user && (user.name || user.avatar);

  if (!shouldRenderHeader) {
    return null;
  }

  const headerStyles: React.CSSProperties = {
    backgroundColor: 'transparent',
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (pickNotDeprecated(sticky, isSticky)) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  return (
          <AntdLayout.Header style={headerStyles}>
            <Space>
                <Dropdown
                    menu={{
                        items: menuItems,
                        selectedKeys: currentLocale ? [currentLocale] : [],
                    }}
                >
                    <Button type="text"  style={{color:token.colorWhite}}>
                        <Space>
                            {currentLocale === "en" ? "Eng" : "Рус"}
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
                <Space style={{ marginLeft: "8px" }} size="middle">
                <Text  style={{color:token.colorWhite}}>{translate("header.theme", "Theme")}</Text>
                <Switch
                
                    checkedChildren=" "
                    unCheckedChildren=" "
                    onChange={() =>
                        setMode(mode === "light" ? "dark" : "light")
                    }
                    defaultChecked={mode === "dark"}
                />
                </Space>
                <Space style={{ marginLeft: "8px"}} size="middle">
                    {user?.name && <Text strong style={{color:token.colorWhite}}>{user.name}</Text>}
                    {user?.avatar && (
                        <Avatar src={user?.avatar} alt={user?.name} />
                    )}
                </Space>
            </Space>
        </AntdLayout.Header>
  );
};
