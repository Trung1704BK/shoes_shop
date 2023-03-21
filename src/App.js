import { Fragment, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRouter } from "./router";
import MainLayout from "./layout/MainLayout/MainLayout";

function App() {
    return (
        <Router>
            {/* <Suspense fallback={<div>Loading ...</div>}> */}
            <Routes>
                {publicRouter.map((route, index) => {
                    let Layout = MainLayout;
                    if (route.layout === null) {
                        Layout = Fragment;
                    } else if (route.layout) {
                        Layout = route.layout;
                    }
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page></Page>
                                </Layout>
                            }
                        ></Route>
                    );
                })}
            </Routes>
            {/* </Suspense> */}
        </Router>
    );
}

export default App;
