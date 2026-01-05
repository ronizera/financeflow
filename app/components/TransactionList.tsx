"use client";

import { useRouter } from "next/navigation";
import { TransactionModel } from "@/types/transaction";

type Props = {
  transactions: TransactionModel[];
};

export default function TransactionList({ transactions }: Props) {
  const router = useRouter();

  async function handleDelete(id: string) {
    await fetch(`/api/transactions?id=${id}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold">Transações</h2>

      {transactions.length === 0 && (
        <p className="text-sm text-gray-500">
          Nenhuma transação cadastrada ainda.
        </p>
      )}

      <div className="space-y-3">
        {transactions.map(transaction => (
          <div
            key={transaction.id}
            className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            {/* LADO ESQUERDO */}
            <div className="flex items-start gap-3">
              <span className="text-xl">
                {transaction.type === "income" ? "⬆️" : "⬇️"}
              </span>

              <div className="space-y-1">
                <strong className="block">{transaction.title}</strong>

                <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {transaction.category}
                </span>
              </div>
            </div>

            {/* LADO DIREITO */}
            <div className="flex items-center gap-4">
              <span
                className={`font-semibold ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"} R${" "}
                {transaction.amount.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>

              <button
                onClick={() => handleDelete(transaction.id)}
                className="text-gray-400 hover:text-red-500 transition"
                title="Excluir"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
