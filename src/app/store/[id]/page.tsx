import Container from "@/app/components/Container";
import { DataType } from "../page";
import Image from "next/image";

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
      <div className=" border-gray-400 bg-slate-300 shadow-lg border-1 m-10">
        <div className="sm:grid sm:grid-cols-12">
          <div className="col-span-5 p-2">
            <Image
              src={data.image}
              alt={data.title}
              width={300}
              height={300}
              className="aspect-auto object-cover"
            />
          </div>

          <div className="col-span-7 p-2">
            <div className="flex justify-around items-center mb-2">
              <h2 className="font-bold ">{data.title}</h2>
              <p>
                price : <span>{data.cost}$</span>
              </p>
            </div>
            <p className="text-gray-500 text-center">{data.description}</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-slate-500  py-2 px-4 font-bold text-white rounded-full">
            +
          </button>
          <span className="mx-3">3</span>
          <button className="bg-slate-500 font-bold py-2 px-4 text-white rounded-full">
            -
          </button>
        </div>
      </div>
    </Container>
  );
}
