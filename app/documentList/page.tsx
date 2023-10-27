'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handleEdit } from "@/components/DocumentActions";
import DocumentComponent from "@/components/DocumentComponent";
import { Document } from "@/interfaces";
import Link from "next/link";

export default function DocumentList() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteDocument, setDeleteDocument] = useState<Document | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    const handleDelete = (document: Document) => {
        setDeleteDocument(document);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (deleteDocument) {
            const res = await fetch(`/api/${deleteDocument.id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setDocuments(
                    documents.filter((keep) => keep.id !== deleteDocument.id)
                );
                setDeleteDocument(null);
                setShowDeleteModal(false);
            }
        }
    };

    const cancelDelete = () => {
        setDeleteDocument(null);
        setShowDeleteModal(false);
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
                        {documents
                            .slice()
                            .reverse()
                            .map((document: Document) => (
                                <div
                                    key={document.id}
                                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2 mb-4"
                                >
                                    <div className="h-full bg-slate-200 rounded-lg p-3 shadow-md">
                                        <Link
                                            href={`/documentList/${document.id}`}
                                        >
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
                                                    handleDelete(document)
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
            {showDeleteModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg text-center">
                        <p>Vill du verkligen ta bort detta dokument?</p>
                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                                onClick={confirmDelete}
                            >
                                Ja
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all ml-4"
                                onClick={cancelDelete}
                            >
                                Nej
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
