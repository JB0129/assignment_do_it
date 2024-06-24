"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type Items = { id: number; name: string; isCompleted: boolean };

// 체크박스 컴포넌트
export function CheckBox({ el }: { el: Items }) {
  const router = useRouter();

  // complete 바꾸기
  const postComplete = () => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCompleted: !el.isCompleted }),
    };

    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/doong9/items/${el.id}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        router.refresh();
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <>
      {/* 할 일 항목의 왼쪽 버튼을 클릭하면 체크 표시가가 되면서 완료 상태가 됩니다. */}
      {el.isCompleted ? (
        <Image
          src="/checked.png"
          alt="체크박스"
          width={32}
          height={32}
          onClick={() => postComplete()}
          className="w-[32px] h-[32px] cursor-pointer"
        />
      ) : (
        <Image
          src="/unchecked.png"
          alt="체크박스"
          width={32}
          height={32}
          onClick={() => postComplete()}
          className="w-[32px] h-[32px] cursor-pointer"
        />
      )}
    </>
  );
}
