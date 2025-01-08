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
      <h1 className="py-4">store</h1>
      <div className="grid grid-cols-4 gap-4">
        {data.map((item: DataType) => (
          <ProductItem key={item.id} {...item} />
        ))}
      </div>
    </Container>
  );
}
