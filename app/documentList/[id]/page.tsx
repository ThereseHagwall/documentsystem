export default function PostPage({ params }: { params: { id: number } }) {
    return (
        <div>
            <p>Här visas dokumentet med id: {params.id}</p>
        </div>
    );
}
