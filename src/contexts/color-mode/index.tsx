import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";

type ColorModeContextType = {
    mode: string;
    setMode: (mode: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
    {} as ColorModeContextType,
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const colorModeFromLocalStorage = localStorage.getItem("colorMode");
    const isSystemPreferenceDark = window?.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;

    const systemPreference = isSystemPreferenceDark ? "dark" : "light";
    const [mode, setMode] = useState(
        colorModeFromLocalStorage || systemPreference,
    );

    useEffect(() => {
        window.localStorage.setItem("colorMode", mode);
    }, [mode]);

    const setColorMode = () => {
        if (mode === "light") {
            setMode("dark");
        } else {
            setMode("light");
        }
    };

    const { darkAlgorithm, defaultAlgorithm } = theme;

    return (
        <ColorModeContext.Provider
            value={{
                setMode: setColorMode,
                mode,
            }}
        >
            <ConfigProvider
                // you can change the theme colors here. example: ...RefineThemes.Magenta,
                theme={{
                    token:{
                        colorBgBase:mode === "light"?'#F7FAFC':'#22343C', 
                        colorBgElevated:mode ==="light"?"#FFFFFF":'#172C35',
                        colorTextTertiary:mode ==="light"?"#A0AEC0":'#A7BBD3',
                        colorTextQuaternary:mode ==="light"?"#2D3748":'#FFFFFF',
                        colorFillSecondary:"#5095D5",
                        colorFillQuaternary:"#0B5396",
                    },
       
                    algorithm:mode === "light" ? defaultAlgorithm : darkAlgorithm,
                    components: {
                        Card: {
                            colorBgContainer:mode === "light" ?'#fff':'#172C35 !important',
                        },
                        Input:{
                            colorBgContainer:'#fff',
                            colorTextPlaceholder:'#A0AEC0',
                            colorBorder:'#E2E8F0',
                            colorText:'#2D3748'
                        },
                        Switch: {
                            colorPrimary: "rgba(0, 0, 0, 0.45)",
                          },
                          Table: {
                            headerColor: "#ffffff"
                          }
                      },
                }}
            >
                {children}
            </ConfigProvider>
        </ColorModeContext.Provider>
    );
};
