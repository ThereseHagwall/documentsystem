"use client";
import { useEffect, useState } from "react";
import { Document } from "@/interfaces";

export default function PostPage({ params }: { params: { id: number } }) {
    const [document, setDocument] = useState<Document | null>(null);

    useEffect(() => {
        const getDocument = async () => {
            const result = await fetch(`/api/${params.id}`);
            const documentFromApi = await result.json();
            setDocument(documentFromApi);
        };
        getDocument();
    }, [params.id]);

    let formattedDate = "";
    
    if (document) {
        const timeStampFromDatabase: string = document.created;
        const date: Date = new Date(timeStampFromDatabase);
        
        const options: Intl.DateTimeFormatOptions = {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        };
        formattedDate = new Intl.DateTimeFormat("sv-SE", options).format(date);
    }

    return (
        <div>
            {document ? (
                <div className="m-10">
                    <h2><strong>Titel: </strong>{document.title}</h2>
                    <p>
                        <strong>Skapad av:</strong> {document.author}
                    </p>
                    <p>
                        <strong>Skapad:</strong> {formattedDate}
                    </p>
                    <div>
                        <div
                            dangerouslySetInnerHTML={{ __html: document.content }}
                        />
                    </div>
                </div>
            ) : (
                <p>Laddar dokument...</p>
            )}
        </div>
    );
}
