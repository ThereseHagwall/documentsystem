"use client";
import DocumentComponent from "@/components/DocumentComponent";
import { Document } from "@/interfaces";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function DocumentList() {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const getDocuments = async () => {
            const result = await fetch("/api");
            const documentsFromApi = await result.json();
            setDocuments(documentsFromApi);
        };
        getDocuments();
    }, []);

    return (
        <div>
            {documents &&
                documents.map((document: Document) => (
                    <Link
                        key={document.id}
                        href={`/documentList/${document.id}`}
                    >
                        <DocumentComponent document={document} />
                    </Link>
                ))}
            <div className="m-2 mt-5">
                <Link
                    className=" bg-blue-500 rounded-lg  p-2"
                    href={`/addNewDoc`}
                >
                    Lägg till nytt dokument
                </Link>
            </div>
        </div>
    );
}
