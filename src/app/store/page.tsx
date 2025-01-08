// fake-db
import { data } from "../../../data/db";
// COMPONENTS
import Container from "../components/Container";
import ProductItem from "../components/ProductItem";

export interface DataType {
  id: number;
  title: string;
  cost: string;
  description: string;
  image: string;
}

export default function Store() {
  return (
    <Container>
      <h1 className="py-4 font-bold lg:text-[20px] text-[16px]">store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {data.map((item: DataType) => (
          <ProductItem key={item.id} {...item} />
        ))}
      </div>
    </Container>
  );
}
