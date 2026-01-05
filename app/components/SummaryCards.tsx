import { TransactionModel } from "@/types/transaction";

export default function SummaryCards({
  transactions,
}: {
  transactions: TransactionModel[];
}) {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const outcome = transactions
    .filter(t => t.type === "outcome")
    .reduce((acc, t) => acc + t.amount, 0);

  const total = income - outcome;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Saldo Total" value={total} />
      <Card title="Entradas" value={income} variant="income" />
      <Card title="Saídas" value={outcome} variant="outcome" />
    </div>
  );
}

function Card({
  title,
  value,
  variant,
}: {
  title: string;
  value: number;
  variant?: "income" | "outcome";
}) {
  const color =
    variant === "income"
      ? "text-green-600"
      : variant === "outcome"
      ? "text-red-600"
      : "text-gray-900";

  return (
    <div className="bg-white border rounded-xl p-6 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <strong className={`text-2xl ${color}`}>
          R$ {value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </strong>
      </div>
    </div>
  );
}
