import 'bootstrap/dist/css/bootstrap.min.css';

import AppContext from "@/context/AppContext";
import { Weaver } from "@/lib/services";

export default function App({ Component, pageProps }) {
    const crawler = new Weaver();

    return (
        <AppContext.Provider value={{ crawler }}>
            <Component {...pageProps} />
        </AppContext.Provider>
    )
}