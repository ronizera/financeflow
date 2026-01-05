import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SummaryCards from "./components/SummaryCards";
import Header from "./components/Header";
import { TransactionModel } from "@/types/transaction";

async function getTransactions(): Promise<TransactionModel[]> {
  const res = await fetch("http://localhost:3000/api/transactions", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar transações");
  }

  return res.json();
}

export default async function Home() {
  const transactions = await getTransactions();

  return (
    <main className="max-w-7xl mx-auto p-6 space-y-6">
      <Header />
      <SummaryCards transactions={transactions} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TransactionForm />
        <TransactionList transactions={transactions} />
      </div>
    </main>
  );
}
