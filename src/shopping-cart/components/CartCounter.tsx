"use client";
import { useAppSelector } from "@/store";
import { useAppDispatch } from "../../store/index";
import {
  addOne,
  initCounter,
  substractOne,
} from "@/store/counter/counterSlice";
import { useEffect } from "react";

interface CartCounterProps {
  value?: number;
}

interface getApiCounterResponse {
  count: number;
}

const getApiCounter = async (): Promise<getApiCounterResponse> => {
  const data = await fetch("http://localhost:3000/api/counter", {
    method: "GET",
  }).then((res) => res.json());
  return data;
};

export const CartCounter: React.FC<CartCounterProps> = ({ value }) => {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(initCounter(value || 0));
  // }, [dispatch, value]);

  useEffect(() => {
    console.log("UseEffect");
    getApiCounter().then(({ count: value }) => dispatch(initCounter(value)));
  }, []);

  return (
    <>
      <span className="text-9xl"> {count} </span>
      <div className="flex">
        <button
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
          onClick={() => dispatch(addOne())}
        >
          +1
        </button>
        <button
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
          onClick={() => dispatch(substractOne())}
        >
          -1
        </button>
      </div>
    </>
  );
};
