import { useContext } from "react";
import AppContext from "@/context/AppContext";
import Bozos from "@/components/Bozos";

export default function Home() {
    const { crawler } = useContext(AppContext);       
    crawler.source();

    return (
        <>
            <Bozos startCb={crawler.start} stopCb={crawler.stop} />            
        </>
    );
}