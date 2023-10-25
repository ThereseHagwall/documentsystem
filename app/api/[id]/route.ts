import { dbQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    if (!id) {
        return NextResponse.error();
    }
    const sql = "SELECT * FROM documents WHERE id = " + parseInt(id);
    const values = [id];

    try {
        const result = await dbQuery({
            sql,
            values,
        });

        if (result && Array.isArray(result) && result.length > 0) {
            return NextResponse.json(result[0]);
        } else {
            return NextResponse.error();
        }
    } catch (error) {
        return NextResponse.error();
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const body = await req.json();
    const { title, author, content } = body;

    const result = await dbQuery({
        sql: "UPDATE documents SET title=?, author=?, content=? WHERE id="+parseInt(id),
        values: [title, author, content],
    });
    return NextResponse.json(result, { status: 200 });
}
