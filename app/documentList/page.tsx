"use client";
import DocumentComponent from "@/components/DocumentComponent";
import { Document } from "@/interfaces";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from 'next/navigation';

export default function DocumentList() {
    const [documents, setDocuments] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const getDocuments = async () => {
            const result = await fetch("/api");
            const documentsFromApi = await result.json();
            setDocuments(documentsFromApi);
        };
        getDocuments();
    }, []);

    const handleEdit = (document: Document) => {
        router.push('/edit-doc/?id=' + document.id);
    }

    return (
        <div>
            {documents &&
                documents.map((document: Document) => (
                    <div className="flex" key={document.id}>
                        <Link
                            key={document.id}
                            href={`/documentList/${document.id}`}
                        >
                            <DocumentComponent document={document} />{" "}
                        </Link>
                        <div className="flex gap-5">
                            <button onClick={(e) => handleEdit(document)}>Redigera</button>
                            <button>Ta bort</button>
                        </div>
                    </div>
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
