import { Document } from "@/interfaces";

interface Props {
    document: Document;
}

export default function DocumentComponent(props: Props) {
    return (
        <div className=" bg-slate-400 rounded-lg m-2 p-4">
            <h3 className="text-xl text-black">
                {props.document.title} av {props.document.author}
            </h3>
        </div>
    );
}
