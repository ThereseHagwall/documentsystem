
export default function PostPage({params} : {params: {id: number}}) {
  return (
    <div>
      <p>Här visas ett dokument med id: {params.id}</p>
    </div>
  )
}
