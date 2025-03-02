import Container from "../components/Container";
import CartItem from "../components/CartItem";
import { DataType } from "../store/page";

export default function Cart(data: DataType) {
  return (
    <Container>
      <CartItem data={data} />
    </Container>
  );
}
