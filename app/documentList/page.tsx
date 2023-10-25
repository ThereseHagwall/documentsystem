"use client";
import DocumentComponent from "@/components/DocumentComponent";
import { Document } from "@/interfaces";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
        router.push("/edit-doc/?id=" + document.id);
    };

    const handleDelete = async (document: Document) => {
        const res = await fetch("api/" + document.id, {
            method: "DELETE",
        });
        if (res.ok) {
            setDocuments(
                documents.filter((keep: Document) => keep.id !== document.id)
            );
        }
    };

    return (
        <div>
            {documents ? (
                <div className="p-3 max-w-screen-lg mx-auto">
                    <h1 className="text-black text-3xl font-semibold mb-4">
                        Dokumentlista
                    </h1>
                    {documents.map((document: Document) => (
                        <div
                            key={document.id}
                            className=" bg-neutral-500 rounded-lg p-3 shadow-md mb-4"
                        >
                            <Link href={`/documentList/${document.id}`}>
                                <DocumentComponent document={document} />
                            </Link>
                            <div className="flex gap-2 justify-end mt-4">
                                <button
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all"
                                    onClick={() => handleEdit(document)}
                                >
                                    Redigera
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                                    onClick={() => handleDelete(document)}
                                >
                                    Ta bort
                                </button>
                            </div>
                        </div>
                    ))}
                    <Link
                        className="bg-blue-500 text-white rounded-lg px-4 py-2 inline-block mt-4 hover:bg-blue-600 transition-all"
                        href="/addNewDoc"
                    >
                        Lägg till nytt dokument
                    </Link>
                </div>
            ) : (
                <div>Laddar dokument ....</div>
            )}
        </div>
    );
}
