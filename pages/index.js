import { useContext } from "react";
import AppContext from "@/context/AppContext";
import { Bozos, SourceForm } from "@/components";

export default function Home() {
    const { crawler } = useContext(AppContext);       
    crawler.source();

    return (
        <>
            <SourceForm />
            <Bozos startCb={crawler.start} stopCb={crawler.stop} />            
        </>
    );
}