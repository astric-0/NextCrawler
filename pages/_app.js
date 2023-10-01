import 'bootstrap/dist/css/bootstrap.min.css';

import AppContext from "@/context/AppContext";
import { Weaver } from "@/lib/services";

import Layout from "@/components/layouts/Layout";

export default function App({ Component, pageProps }) {
    const crawler = new Weaver();

    return (
        <AppContext.Provider value={{ crawler }}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppContext.Provider>
    );
}