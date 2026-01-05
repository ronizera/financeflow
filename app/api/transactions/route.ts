import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { json } from "zod";

const prisma = new PrismaClient();

// GET → listar transações
export async function GET() {
  const transactions = await prisma.transaction.findMany();
  return NextResponse.json(transactions);
}

// POST → criar transação
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, amount, type, category, date } = body;

    if (!title || !amount || !type) {
      return NextResponse.json(
        { error: "Dados obrigatórios faltando" },
        { status: 400 }
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount,
        type,
        category: category ?? "Geral",
        date: date ? new Date(date) : new Date(),
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar transação" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")

    if(!id) {
      return NextResponse.json(
        {error: "ID nao informado"},
        {status: 400}
      )
    }

    await prisma.transaction.delete({
      where: {id},
    })

    return NextResponse.json({message: "Transacao removida"})
  } catch (error) {
    return NextResponse.json(
      {error: "Erro ao deletar transacao"},
      {status: 500}
    );
  }
}
