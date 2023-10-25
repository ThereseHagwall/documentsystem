"use client";
import { useEffect, useState } from "react";
import { Document } from "@/interfaces";
import { Editor } from "@tinymce/tinymce-react";

export default function PostPage({ params }: { params: { id: number } }) {
    const [document, setDocument] = useState<Document | null>(null);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    
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
    const handleInputChange = () => {
        console.log('Ändrat');
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
                        onChange={handleInputChange}
                    />
                    <label htmlFor="author">Skapare:</label>
                    <input
                        className="text-black"
                        type="text"
                        id="author"
                        name="author"
                        value={document.author}
                        onChange={handleInputChange}
                    />
                    <div className="mt-10">
                        <Editor
                            apiKey={apiKey}
                            init={{
                                plugins:
                                    "preview mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                                toolbar:
                                    "preview undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
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
