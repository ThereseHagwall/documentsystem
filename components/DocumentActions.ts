// documentActions.ts

export const handleEdit = (router: any, document: { id: number }) => {
    router.push("/edit-doc/?id=" + document.id);
};

export const handleDelete = async (
    document: { id: number },
    setDocuments: React.Dispatch<React.SetStateAction<any[]>>
) => {
    const res = await fetch(`/api/${document.id}`, {
        method: "DELETE",
    });
    if (res.ok) {
        setDocuments((documents) =>
            documents.filter((keep) => keep.id !== document.id)
        );
    }
};
