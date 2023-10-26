export const handleEdit = (router: any, document: { id: number }) => {
    router.push("/edit-doc/?id=" + document.id);
};
