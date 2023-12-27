import React, { useContext } from "react";
import { useRouterContext, useRouterType, useLink } from "@refinedev/core";
import {  Space } from "antd";
import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";
import { ColorModeContext } from "../../contexts/color-mode";

export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
}) => {

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
          ...wrapperStyles,
        }}
      >
        <div>
          <img src="/images/logo/mini-logo.svg" width='100%' height={30} />
        </div>

        {!collapsed && (
          <div
            style={{
              marginBottom: 0,
              paddingTop:mode=='light' ? '6px' : '0px',
              paddingLeft:mode=='light' ? '5px' : '10px'
            }}
          >
            <img src={mode=='light' ? '/images/logo/ds.svg' : '/images/logo/ds-dark.svg'} width='100%' height={30}  />
          </div>
        )}
      </Space>
    </ActiveLink>
  );
};
