import DocumentComponent from "@/components/DocumentComponent"
import Link from "next/link"


export default function documentList() {

  const documents = [
    {
      id: 1,
      author: 'Therese',
      title: 'Dokument 1',
      content: 'Detta är dokument 1.'
    },
    {
      id: 2,
      author: 'Jimmy',
      title: 'Dokument 2',
      content: 'Detta är dokument 2.'
    },
    {
      id: 3,
      author: 'Kalle',
      title: 'Dokument 3',
      content: 'Detta är dokument 3.'
    },
  ]

  return (
    <div>
        {documents.map((document) => (
          <Link key={document.id} href={`/documentList/${document.id}`}>
            <DocumentComponent document={document}/>
          </Link>
        ))}
    </div>
  )
}
