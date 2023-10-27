"use client";
import { useEffect, useState } from "react";
import { Document } from "@/interfaces";
import { handleEdit } from "@/components/DocumentActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PostPage({ params }: { params: { id: number } }) {
    const [document, setDocument] = useState<Document | null | any>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const getDocument = async () => {
            const result = await fetch(`/api/${params.id}`);
            const documentFromApi = await result.json();
            setDocument(documentFromApi);
        };
        getDocument();
    }, [params.id]);

    let formattedDate = "";
    const router = useRouter();

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

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (document) {
            const res = await fetch(`/api/${document.id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                router.push("/documentList");
            }
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    return (
        <div className="min-w-xl mx-auto p-4 mb-10">
            {document ? (
                <div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="text-xl mb-2 flex gap-6">
                            <div>
                                <strong>Titel: </strong>
                                {document.title}
                            </div>
                            <div>
                                <strong>Skapad av:</strong> {document.author}
                            </div>
                        </div>
                        <div
                            className="mb-2"
                            dangerouslySetInnerHTML={{
                                __html: document.content,
                            }}
                        />
                        <p>
                            <strong>Skapad:</strong> {formattedDate}
                        </p>
                    </div>
                    <div className="flex gap-2 justify-between mt-4">
                        <Link
                            className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all"
                            href="/documentList"
                        >
                            Tillbaka
                        </Link>
                        <div className="flex gap-3">
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all"
                                onClick={() => handleEdit(router, document)}
                            >
                                Redigera
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                                onClick={handleDelete}
                            >
                                Ta bort
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Laddar dokument...</p>
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
