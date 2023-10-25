"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface FormData {
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
            } else {
                console.error("Postning misslyckades");
            }
        } catch (error) {
            console.error("Ett fel inträffade:", error);
        }
    };

    return (
        <div className="max-w-xl space-y-3">
            <label htmlFor="title">Titel:</label>
            <input
                className="text-black"
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
            />
            <label htmlFor="author">Skapare:</label>
            <input
                className="text-black"
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
            />
            <Editor
                apiKey="3fe4libsdxwjnhv8hpgzb4qo1y7yxj3fvu8t6d7c1kwrnhjo"
                init={{
                    plugins:
                        "ai mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                    toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                    ai_request: (request: Request, respondWith: any) =>
                        respondWith.string(() =>
                            Promise.reject("See docs to implement AI Assistant")
                        ),
                }}
                initalValue={formData.content}
                onEditorChange={handleEditorChange}
            />
            <button
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                type="submit"
                onClick={handleSubmit}
            >
                Skicka
            </button>
        </div>
    );
}
