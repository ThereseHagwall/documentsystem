"use client";
import DocumentComponent from "@/components/DocumentComponent";
import { Document } from "@/interfaces";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleEdit} from "@/components/DocumentActions";

export default function DocumentList() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const getDocuments = async () => {
            const result = await fetch("/api");
            const documentsFromApi = await result.json();
            setDocuments(documentsFromApi);
            setLoading(false);
        };
        getDocuments();
    }, []);

        const handleDelete = async (
        document: { id: number }) => {
        const res = await fetch(`/api/${document.id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            setDocuments(documents.filter((keep) => keep.id != document.id)
            );
        }
    };

    return (
        <div>
            {loading ? (
                <div>Laddar dokument ....</div>
            ) : (
                <div className="p-3 max-w-screen-lg mx-auto">
                    <div className="flex justify-between mb-4 ">
                        <h1 className="text-black text-3xl font-semibold mb-4">
                            Dokumentlista
                        </h1>
                        <Link
                            className="bg-blue-500 text-white rounded-lg px-4 py-2 inline-block mb-4 hover:bg-blue-600 transition-all"
                            href="/addNewDoc"
                        >
                            Lägg till nytt dokument
                        </Link>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        {documents.map((document: Document) => (
                            <div
                                key={document.id}
                                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2 mb-4"
                            >
                                <div className="h-full bg-slate-200 rounded-lg p-3 shadow-md">
                                    <Link href={`/documentList/${document.id}`}>
                                        <DocumentComponent
                                            document={document}
                                        />
                                    </Link>
                                    <div className="flex gap-2 justify-end mt-4">
                                        <button
                                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all"
                                            onClick={() =>
                                                handleEdit(router, document)
                                            }
                                        >
                                            Redigera
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover-bg-red-600 transition-all"
                                            onClick={() =>
                                                handleDelete(
                                                    document,
                                                )
                                            }
                                        >
                                            Ta bort
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
