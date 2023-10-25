"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";

export interface FormData {
    title: string;
    author: string;
    content: string;
}

export default function Page() {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        author: "",
        content: "",
    });

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const router = useRouter();

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditorChange = (content: string, editor: any) => {
        setFormData((prevData) => ({
            ...prevData,
            content: content,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 200) {
                setFormData({
                    title: "",
                    author: "",
                    content: "",
                });
                router.push("/documentList");
            } else {
                console.error("Postningen misslyckades");
            }
        } catch (error) {
            console.error("Ett fel inträffade:", error);
        }
    };

    return (
        <div>
            <h1 className="font-bold mt-2 text-2xl">Lägg till nytt dokument</h1>
            <div className="max-w-xl mt-7 m-auto p-4 bg-slate-300 rounded shadow-2xl">
                <label
                    htmlFor="title"
                    className="text-lg text-black font-semibold"
                >
                    Titel:
                </label>
                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
                <label
                    htmlFor="author"
                    className="text-lg font-semibold text-black"
                >
                    Skapad av:
                </label>
                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                />
                <label
                    className="text-lg text-black font-semibold"
                    htmlFor="editor"
                >
                    Innehåll:
                </label>
                <Editor
                    id="editor"
                    apiKey={apiKey}
                    init={{
                        plugins:
                            "ai mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                        toolbar:
                            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                        ai_request: (request: Request, respondWith: any) =>
                            respondWith.string(() =>
                                Promise.reject(
                                    "See docs to implement AI Assistant"
                                )
                            ),
                    }}
                    value={formData.content}
                    onEditorChange={handleEditorChange}
                />
                <button
                    className="bg-blue-500 mt-2 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-all cursor-pointer"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Skicka
                </button>
            </div>
        </div>
    );
}
