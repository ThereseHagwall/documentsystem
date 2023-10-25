import { dbQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    const result = await dbQuery({
        sql: "SELECT * FROM documents WHERE deleted=0",
        values: [],
    });
    return NextResponse.json(result);
}

export async function POST(req: Request, res: Response){
    const body = await req.json();
    const {title, author, content} = body;

    const results = await dbQuery({
        sql: 'INSERT INTO documents (title, author, content) VALUES (?, ?, ?)',
        values: [title, author, content]
    });
    return NextResponse.json(results, {status: 200});
}
