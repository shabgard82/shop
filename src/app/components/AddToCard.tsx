"use client";

import { useShoppingCartContext } from "../context/ShoppingCartContext";

interface idType {
  id: string;
}

export default function AddToCard({ id }: idType) {
  const { handleAddBtn } = useShoppingCartContext();

  return (
    <div>
      <button
        className="bg-slate-500  py-2 px-4 font-bold text-white rounded-full"
        onClick={() => handleAddBtn(parseInt(id))}
      >
        +
      </button>
      <span className="mx-3">3</span>
      <button
        className="bg-slate-500 font-bold py-2 px-4 text-white rounded-full"
        // onClick={handleRemoveBtn}
      >
        -
      </button>
    </div>
  );
}
