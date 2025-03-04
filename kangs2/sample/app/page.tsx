"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
}

const DUMMY_DATA: User[] = [
  { id: "cmlee", name: "이충무" },
  { id: "yskang", name: "강윤성" }
];

export default function Home() {
  const [counter, setCounter] = useState<number>(2);
  const [secondCounter, setSecondCounter] = useState<number>(2);

  useEffect(() => {
    console.log("Counter values updated:", { counter, secondCounter });
  }, [counter, secondCounter]);

  const handleIncrement = () => {
    setCounter(prev => prev + 1);
    setSecondCounter(prev => prev + 1);
  };

  return (
    <main className="min-h-screen p-8 pb-20 sm:p-20">
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 font-[family-name:var(--font-geist-sans)]">
        <button 
          onClick={handleIncrement}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          카운터 증가
        </button>

        <Link 
          href="/login"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          로그인 페이지로 이동
        </Link>

        <div className="text-lg font-semibold">
          카운터: {counter} | 두번째 카운터: {secondCounter}
        </div>

        <div className="w-full max-w-md space-y-2">
          <h2 className="text-xl font-bold mb-4">사용자 목록</h2>
          {DUMMY_DATA.map((user) => (
            <div 
              key={user.id}
              className="p-3 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <span className="font-medium">{user.id}</span>
              <span className="mx-2">:</span>
              <span>{user.name}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
