import { 
    Refine,
    Authenticated, 
} from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { ErrorComponent
,useNotificationProvider
,ThemedLayoutV2
,ThemedSiderV2} from '@refinedev/antd';
import "@refinedev/antd/dist/reset.css";
import { AuthPage } from './components/pages/auth';

import { DataProvider } from "@refinedev/strapi-v4";
import { App as AntdApp } from "antd"
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, { NavigateToResource, CatchAllNavigate, UnsavedChangesNotifier, DocumentTitleHandler } from "@refinedev/react-router-v6";
import { useTranslation } from "react-i18next";
import { Indicator } from "./pages/indicators";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import { authProvider, axiosInstance } from "./authProvider";
import { API_URL } from "./constants";
import { BarChartOutlined } from '@ant-design/icons';




function App() {
    const { t, i18n } = useTranslation();

    
            const i18nProvider = {
                translate: (key: string, params: object) => t(key, params),
                changeLocale: (lang: string) => i18n.changeLanguage(lang),
                getLocale: () => i18n.language,
            };
            
    
    return (
        <BrowserRouter>
        <RefineKbarProvider>
            <ColorModeContextProvider>
            <AntdApp>
       
                <Refine authProvider={authProvider}
dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
notificationProvider={useNotificationProvider}
routerProvider={routerBindings}
i18nProvider={i18nProvider} 
                        resources={[
                            { 
                                name: "indicators", 
                                list: () => null,
                                icon:<BarChartOutlined />
                            ,
                            }
                        ]}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                        useNewQueryKeys: true,
                            projectId: "gDXQfO-mvNwTl-XW7XgF",
                        
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    key="authenticated-inner"
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                        <ThemedLayoutV2
                                            Header={() => <Header sticky />}
                                            Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                                        >
                                            <Outlet />
                                        </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route index element={
                                    <NavigateToResource resource="indicators" />
                            } />
                            <Route
                                path="indicators"
                                element={<Indicator />}
                            />
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                        <Route
                            element={
                                <Authenticated key="authenticated-outer" fallback={<Outlet />}>
                                    <NavigateToResource />
                                </Authenticated>
                            }
                        >
                                <Route
                                    path="/login"
                                    element={(
                                        <AuthPage
                                            type="login"
                                            //formProps={{ initialValues:{ email: "demo@refine.dev", password: "demodemo" } }}
                                        />
                                    )}
                                />
                                <Route
                                    path="/register"
                                    element={<AuthPage type="register" />}
                                />
                                <Route
                                    path="/forgot-password"
                                    element={<AuthPage type="forgotPassword" />}
                                />
                        </Route>
                    </Routes>


                    <RefineKbar />
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </AntdApp>
            </ColorModeContextProvider>
        </RefineKbarProvider>
        </BrowserRouter>
      );
}

export default App;
