import Image from "next/image";
import { DataType } from "../store/page";

interface CartItemProps {
  data: DataType;
}

export default function CartItem({ data }: CartItemProps) {
  return (
    <div>
      <div className="col-span-12">
        <div className="col-span-3">
          <Image
            src={data.image}
            alt={data.title}
            width={300}
            height={300}
            className="aspect-auto object-cover w-full"
          />
        </div>
        <div col-span-9>
          <p>{data?.description}</p>
        </div>
      </div>
    </div>
  );
}
