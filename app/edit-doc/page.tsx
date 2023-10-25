"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Document } from "@/interfaces";
import { Editor } from "@tinymce/tinymce-react";
import { FormData } from "../addNewDoc/page";
import Link from "next/link";

export default function EditDocument() {
    const [document, setDocument] = useState<Document | null>(null);
    const [formData, setFormData] = useState<FormData>({
        title: "",
        author: "",
        content: "",
    });

    const router = useRouter();
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const searchParams = useSearchParams();
    const documentId = searchParams.get("id");

    useEffect(() => {
        const getDocument = async () => {
            const res = await fetch(`/api/${documentId}`);
            const documentFromApi = await res.json();
            setDocument(documentFromApi);
        };
        if (documentId) getDocument();
    }, [documentId]);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/" + documentId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            router.push("/documentList");
        }
    };

    return (
        <div>
            {document ? (
                <div className="m-10 p-4 bg-slate-200 rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold mb-4">
                        Redigera dokument
                    </h1>
                    <div className="my-4">
                        <label
                            htmlFor="title"
                            className="text-lg font-semibold"
                        >
                            Titel:
                        </label>
                        <input
                            className="block w-full border rounded-md p-2 shadow-lg"
                            type="text"
                            id="title"
                            name="title"
                            placeholder={document.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="my-4">
                        <label
                            htmlFor="author"
                            className="text-lg font-semibold"
                        >
                            Skapare:
                        </label>
                        <input
                            className="block w-full border rounded-md p-2 shadow-lg"
                            type="text"
                            id="author"
                            name="author"
                            placeholder={document.author}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mt-8">
                        <div className="border rounded-md shadow-lg">
                            <Editor
                                id="editor"
                                apiKey={apiKey}
                                init={{
                                    plugins:
                                        "preview mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                                    toolbar:
                                        "preview undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                                }}
                                initialValue={document.content}
                                onEditorChange={(content: any, editor: any) =>
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        content,
                                    }))
                                }
                            />
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all mr-4"
                                onClick={handleSubmit}
                                type="submit"
                            >
                                Spara
                            </button>
                            <Link
                                href="/documentList"
                                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-all"
                            >
                                Avbryt
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="m-10">Laddar dokument...</p>
            )}
        </div>
    );
}
