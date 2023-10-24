import { dbQuery } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: number } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.error();
    }
    const sql = "SELECT * FROM documents WHERE id = ?";
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
