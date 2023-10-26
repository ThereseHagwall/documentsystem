import Image from "next/image";
import documentPic from './images/documentpic2.png';

export default function Home() {
    return (
        <div className="text-white flex flex-col p-10 m-3 gap-3">
            <div>Välkommen hit!</div>
            <div>Detta är en dokumenthanterings sida. </div>
            <div>Navigera till de olika sidorna genom länkarna i headern.</div>
            <Image priority className="mt-20" src={documentPic} width={400} alt="" />
        </div>
    );
}
