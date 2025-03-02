import Image from "next/image";
import { DataType } from "../page";
import Container from "@/app/components/Container";
import AddToCard from "@/app/components/AddToCard";

interface paramsType {
  params: Promise<{ id: string }>;
  searchParams: Promise<object>;
}

export default async function StoreDetail({ params }: paramsType) {
  const { id } = await params;

  const resault = await fetch(`http://localhost:5000/products/${id}`);
  const data = (await resault.json()) as DataType;

  return (
    <Container>
      <div className="border-gray-400 bg-slate-300 shadow-lg border-1 m-10 max-w-[1320px] rounded-md">
        <div className="sm:grid sm:grid-cols-12 p-4">
          <div className="col-span-5">
            <Image
              src={data.image}
              alt={data.title}
              width={300}
              height={300}
              className="aspect-auto object-cover w-full"
            />
          </div>

          <div className="col-span-7 p-2">
            <div className="flex justify-around items-center mb-2">
              <h2 className="font-bold ">{data.title}</h2>
            </div>
            <p className="text-gray-500 text-center">{data.description}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-slate-100 p-2 rounded-md max-w-[1320px] mx-10">
        <AddToCard id={id} />
        <p className="pl-10">
          price : <span>{data.cost}$</span>
        </p>
      </div>
    </Container>
  );
}
