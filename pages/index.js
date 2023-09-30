import { Weaver } from "@/lib/services"

const spidy = new Weaver();
spidy.init();

export default function Home() {
    return (
        <>
            <button onClick={spidy.weave()}>Start</button>
            <button onClick={spidy.stop()}>Stop</button>
        </>
    )
}