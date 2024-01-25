import { DownOutlined } from "@ant-design/icons";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity, useGetLocale, useSetLocale,useTranslate } from "@refinedev/core";
import {
    Avatar,
    Button,
    Dropdown,
    MenuProps,
    Space,
    Switch,
    theme,
    Typography,
} from "antd";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ColorModeContext } from "../../contexts/color-mode";

const { Text } = Typography;
const { useToken } = theme;


type IUser = {
    id: number;
    name: string;
    avatar: string;
};

export const HeaderCustom: React.FC<RefineThemedLayoutV2HeaderProps> = ({
    sticky,
}) => {
    const { token } = useToken();
    const { i18n } = useTranslation();
    const locale = useGetLocale();
    const changeLanguage = useSetLocale();
    const { data: user } = useGetIdentity<IUser>();
    const { mode, setMode } = useContext(ColorModeContext);
    const translate = useTranslate();

    const currentLocale = locale();

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

    const headerStyles: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
    };

    if (sticky) {
        headerStyles.position = "sticky";
        headerStyles.top = 0;
        headerStyles.zIndex = 1;
    }

    return (
        
            <Space style={{
                position:'absolute',
                top:'15px',
                right:'15px',
                zIndex:99
            }}>
                <Dropdown
                    menu={{
                        items: menuItems,
                        selectedKeys: currentLocale ? [currentLocale] : [],
                    }}
                >
                    <Button type="text" style={{color:token.colorWhite}}>
                        <Space>
                            {currentLocale === "en" ? "Eng" : "Рус"}
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
                <Space style={{ marginLeft: "8px" }} size="middle">
                <Text style={{color:token.colorWhite}}>{translate("header.theme", "Theme")}</Text>
                <Switch
                
                    checkedChildren=" "
                    unCheckedChildren=" "
                    onChange={() =>
                        setMode(mode === "light" ? "dark" : "light")
                    }
                    defaultChecked={mode === "dark"}
                />
                </Space>
                <Space style={{ marginLeft: "8px" }} size="middle">
                    {user?.name && <Text strong style={{color:token.colorWhite}}>{user.name}</Text>}
                    {user?.avatar && (
                        <Avatar src={user?.avatar} alt={user?.name} />
                    )}
                </Space>
            </Space>
    );
};
