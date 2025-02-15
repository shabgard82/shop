import Link from "next/link";
// COMPONENTS
import Container from "../components/Container";
import ProductItem from "../components/ProductItem";

export interface DataType {
  id: string;
  title: string;
  cost: string;
  description: string;
  image: string;
}

export default async function Store() {
  const resault = await fetch("http://localhost:5000/products");
  const data = (await resault.json()) as DataType[];

  return (
    <Container>
      <h1 className="py-4 font-bold lg:text-[20px] text-[16px]">store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {data.map((item: DataType) => (
          <Link href={`/store/${item.id}`} key={item.id}>
            <ProductItem {...item} />
          </Link>
        ))}
      </div>
    </Container>
  );
}
