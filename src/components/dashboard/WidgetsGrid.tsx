"use client";
import { useAppSelector } from "@/store";
import { SimpleWidget } from "./SimpleWidget";
import { IoCartOutline } from "react-icons/io5";

export const WidgetsGrid = () => {
  const count = useAppSelector((state) => state.counter.count);

  return (
    <div className="flex flex-wrap p-2 items-center justify-center">
      <SimpleWidget
        title={count.toString()}
        label="Contador"
        subtitle="Contador prueba"
        href="/dashboard/counter"
        icon={<IoCartOutline size={70} className="text-blue-600" />}
      />
      <SimpleWidget
        title={count.toString()}
        label="Contador"
        subtitle="Contador prueba"
        icon={<IoCartOutline size={70} className="text-blue-600" />}
      />
    </div>
  );
};
