import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24">
      <Link href='/Shop'>Add Item</Link>
      <Link href='/healthplans'>Health plans</Link>
      <Link href='/manageproducts'>Manage Products</Link>
    </main>
  );
}
