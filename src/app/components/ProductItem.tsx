import Image from "next/image";
// TYPES
import { DataType } from "../store/page";

export default function ProductItem({
  id,
  cost,
  image,
  title,
  description,
}: DataType) {
  return (
    <div className="shadow-lg">
      <div className="relative aspect-video">
        <Image
          fill
          alt="burger"
          src={image}
          className="object-cover relative rounded-md"
        />
        <p className="absolute top-1 right-1 bg-red-600 rounded-full px-2">
          {id}
        </p>
      </div>

      <div className="p-2">
        <div className="flex justify-between items-center">
          <p>{title}</p>
          <p className="text-red-700">{cost}$</p>
        </div>
        <p className="text-gray-500">{description.slice(0, 100) + "..."}</p>
      </div>
    </div>
  );
}
