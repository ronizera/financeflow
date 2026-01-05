"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TransactionForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "outcome">("income");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !amount || !category) return;

    setLoading(true);

    await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        amount: Number(amount),
        category,
        type,
      }),
    });

    setTitle("");
    setAmount("");
    setCategory("");
    setType("income");

    setLoading(false);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-xl p-6 space-y-5"
    >
      {/* TÍTULO */}
      <div>
        <h2 className="text-lg font-semibold">Nova Transação</h2>
        <p className="text-sm text-gray-500">
          Adicione uma entrada ou saída
        </p>
      </div>

      {/* TÍTULO DA TRANSAÇÃO */}
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* VALOR */}
      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* CATEGORIA */}
      <input
        type="text"
        placeholder="Categoria"
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* TIPO */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setType("income")}
          className={`border rounded-lg py-2 font-medium transition ${
            type === "income"
              ? "bg-green-100 border-green-500 text-green-700"
              : "hover:bg-gray-100"
          }`}
        >
          ⬆️ Entrada
        </button>

        <button
          type="button"
          onClick={() => setType("outcome")}
          className={`border rounded-lg py-2 font-medium transition ${
            type === "outcome"
              ? "bg-red-100 border-red-500 text-red-700"
              : "hover:bg-gray-100"
          }`}
        >
          ⬇️ Saída
        </button>
      </div>

      {/* BOTÃO */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
      >
        {loading ? "Salvando..." : "Adicionar Transação"}
      </button>
    </form>
  );
}
