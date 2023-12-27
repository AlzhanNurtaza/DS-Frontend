import React, { useContext } from "react";
import { useRouterContext, useRouterType, useLink } from "@refinedev/core";
import { Typography, theme, Space } from "antd";
import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";
import { ColorModeContext } from "../../contexts/color-mode";

const { useToken } = theme;


export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
}) => {
  const { token } = useToken();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const { mode } = useContext(ColorModeContext);

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ActiveLink
      to="/"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "inherit",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "24px",
            width: "24px",
            color: token.colorPrimary,
          }}
        >
          <img src="/images/logo/mini-logo.svg" height={24} />
        </div>

        {!collapsed && (
          <Typography.Title
            style={{
              fontSize: "inherit",
              marginBottom: 0,
              fontWeight: 700,
              paddingTop:mode=='light' ? '12px' : '0px',
              paddingLeft:mode=='light' ? '5px' : '10px'
            }}
          >
            <img src={mode=='light' ? '/images/logo/ds.svg' : '/images/logo/ds-dark.svg'} height={24}  />
          </Typography.Title>
        )}
      </Space>
    </ActiveLink>
  );
};
