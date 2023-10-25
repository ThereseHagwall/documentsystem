"use client";
import { useEffect, useState } from "react";
import { Document } from "@/interfaces";
import { Editor } from "@tinymce/tinymce-react";

export default function PostPage({ params }: { params: { id: number } }) {
    const [document, setDocument] = useState<Document | null>(null);

    useEffect(() => {
        const getDocument = async () => {
            const result = await fetch(`/api/${params.id}`);
            const documentFromApi = await result.json();
            setDocument(documentFromApi);
        };
        getDocument();
    }, [params.id]);

    let formattedDate = "";

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

    return (
        <div>
            {document ? (
                <div className="m-10">
                    <label htmlFor="title">Titel:</label>
                    <input
                        className="text-black"
                        type="text"
                        id="title"
                        name="title"
                        value={document.title}
                    />
                    <label htmlFor="author">Skapare:</label>
                    <input
                        className="text-black"
                        type="text"
                        id="author"
                        name="author"
                        value={document.author}
                    />
                    <div className="mt-10">
                        <Editor
                            apiKey="3fe4libsdxwjnhv8hpgzb4qo1y7yxj3fvu8t6d7c1kwrnhjo"
                            init={{
                                plugins:
                                    "ai  mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                                toolbar:
                                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                                ai_request: (
                                    request: Request,
                                    respondWith: any
                                ) =>
                                    respondWith.string(() =>
                                        Promise.reject(
                                            "See docs to implement AI Assistant"
                                        )
                                    ),
                            }}
                            initialValue={document.content}
                        />
                    </div>
                </div>
            ) : (
                <p>Laddar dokument...</p>
            )}
        </div>
    );
}
