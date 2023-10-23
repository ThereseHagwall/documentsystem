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
        </div>
    );
}
