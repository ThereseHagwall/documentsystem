import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col p-10 m-3 gap-3">
            <div>Välkommen hit!</div>
            <div>Detta är en dokumenthanterings sida. </div>
            <div>Navigera till de olika sidorna genom länkarna i headern.</div>
        </div>
    );
}
