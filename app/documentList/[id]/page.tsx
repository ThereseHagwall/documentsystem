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

        formattedDate = new Intl.DateTimeFormat('sv-SE', options).format(date);
    }

    return (
        <div>
            {document ? (
                <div>
                    <h3>Titel: {document.title}</h3>
                    <p>Skapad av: {document.author}</p>
                    <p>Innehåll: {document.content}</p>
                    <p>Skapad: {formattedDate}</p>
                </div>
            ) : (
                <p>Laddar dokument...</p>
            )}
        </div>
    );
}
