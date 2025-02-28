"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<number>(2);
  const [data2, setData2] = useState<number>(2);

  const dummy = [
  {id: "cmlee", name: "이충무"},
  {id: "yskang", name: "강윤성"}
  ]; //db

  useEffect(() => {
    console.log("useEffect");
  },[data, data2]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div onClick={()=> {
        console.log("click event");
        setData(data + 1);
        setData(data2 + 1);
      }}>이벤트</div>
      <Link href="/login">로그인 페이지 이동</Link>
      <div>{data}{data2}</div>

      <div>{dummy.map((data,index) => {
        return <div key={index}>{data.id} : {data.name}</div>
      })}</div>
    </div>
  );
}
