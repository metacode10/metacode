"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
}

export default function Home() {
  const [counter1, setCounter1] = useState<number>(2);
  const [counter2, setCounter2] = useState<number>(2);

  const users: User[] = [
    { id: "cmlee", name: "이충무" },
    { id: "yskang", name: "강윤성" }
  ];

  useEffect(() => {
    console.log("Counters updated:", { counter1, counter2 });
  }, [counter1, counter2]);

  const handleCounterIncrement = () => {
    setCounter1(prev => prev + 1);
    setCounter2(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">카운터 데모</h1>
            <button
              onClick={handleCounterIncrement}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              카운터 증가
            </button>
            <div className="mt-4 text-lg font-medium text-gray-700">
              카운터 1: {counter1} | 카운터 2: {counter2}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">사용자 목록</h2>
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-700">{user.id}</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-gray-600">{user.name}</span>
                </div>
              ))}
            </div>
          </section>

          <Link
            href="/login"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            로그인 페이지
          </Link>
        </div>
      </div>
    </main>
  );
}
