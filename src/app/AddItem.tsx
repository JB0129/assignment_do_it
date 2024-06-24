"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";

export function AddItem({ isItems }: any) {
  const router = useRouter();
  const [newItem, setNewItem] = useState<string>("");

  // 할 일 추가하기
  const postItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newItem) {
      return alert("할 일을 입력해주세요.");
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newItem }),
    };
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doong9/items`, options)
      .then((res) => res.json())
      .then((data) => {
        router.refresh();
        setNewItem("");
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* 상단 입력창에 할 일 텍스트를 입력하고 추가하기 버튼을 클릭하거나 엔터를 치면 할 일을 새로 생성합니다. */}
      <form onSubmit={(e) => postItem(e)} className="flex flex-row w-full">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.currentTarget.value)}
          placeholder="할 일을 입력해주세요"
          className="bg-slate/100 border-2 border-slate/900 rounded-3xl shadow-inputbox shadow-slate/900 w-full max-w-[1011.94px] h-[52.5px] pl-[24px] outline-none"
        />

        <button
          className={`${
            isItems.length
              ? "bg-slate/200 text-black"
              : "bg-violet-600 text-white"
          } border-2 border-slate/900 rounded-3xl shadow-inputbox shadow-slate/900 flex flex-row justify-center items-center w-[55px] md:w-[164.35px] h-[52px] ml-[16px]`}
        >
          <Image
            src={`${isItems.length ? "/plus_B.png" : "/plus_W.png"} `}
            alt="추가하기"
            width={16}
            height={16}
          />
          <span className="ml-[4px] hidden md:block font-semibold">
            추가하기
          </span>
        </button>
      </form>
    </>
  );
}
