"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type ItemInfo = {
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
};

export default function Items(props: any) {
  const router = useRouter();
  const imgRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isCompleted, setCompleted] = useState<boolean>(false);
  const [init, setInit] = useState<ItemInfo>();

  const itemId: number = props.params.itemId;

  // 할 일 상세 정보 불러오기
  const getItemInfo = () => {
    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/doong9/items/${itemId}`,
      { next: { revalidate: 0 } }
    )
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        data.memo && setMemo(data.memo);
        data.imageUrl && setImageUrl(data.imageUrl);
        setCompleted(data.isCompleted);
        setInit({
          name: data.name,
          memo: data.memo,
          imageUrl: data.imageUrl,
          isCompleted: data.isCompleted,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getItemInfo();
  }, []);

  // 이미지 업로드
  const postImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => setImageUrl(reader.result as string);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const options = {
        method: "POST",
        body: formData,
      };

      return fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/doong9/images/upload`,
        options
      )
        .then((res) => res.json())
        .then((data) => {
          router.refresh();
          setImageUrl(data.url);
        })
        .catch((err) => console.log("err", err));
    }
  };

  // 할 일 수정하기
  const patchItem = () => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, memo, imageUrl, isCompleted }),
    };

    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/doong9/items/${itemId}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        router.refresh();
        router.push("/");
      })
      .catch((err) => console.log("err", err));
  };

  // 할 일 삭제하기
  const deleteItem = () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/doong9/items/${itemId}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        router.refresh();
        router.push("/");
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <main className="flex flex-col justify-start items-center w-full max-w-[1200px] md:p-[24px] p-[16px]">
      <section className="border-2 border-slate/900 rounded-3xl flex flex-row justify-center items-center w-full max-w-[996px] h-[64px]">
        {/* 할 일 항목의 왼쪽 버튼을 클릭하면 체크 표시가 되면서 완료 상태가 됩니다. */}

        {isCompleted ? (
          <Image
            src="/checked.png"
            alt="체크박스"
            width={32}
            height={32}
            onClick={() => setCompleted(!isCompleted)}
            className="w-[32px] h-[32px] cursor-pointer"
          />
        ) : (
          <Image
            src="/unchecked.png"
            alt="체크박스"
            width={32}
            height={32}
            onClick={() => setCompleted(!isCompleted)}
            className="w-[32px] h-[32px] cursor-pointer"
          />
        )}

        {/* 항목 이름을 수정할 수 있습니다. */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          className="outline-none ml-[16px] underline"
        />
      </section>

      <section className="flex md:flex-row flex-col justify-center items-start w-full my-[24px]">
        {/* 이미지(최대 1개)를 첨부할 수 있습니다. */}
        <div className="bg-slate/50 border-2 border-dashed border-slate/300 rounded-3xl flex flex-col justify-center items-center md:w-[384px] w-full h-[311px] relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${name} 이미지`}
              width={384}
              height={311}
              className="rounded-3xl w-full h-full"
            />
          ) : (
            <Image
              src={"/img.png"}
              alt={`텅 빈 이미지`}
              width={54}
              height={54}
            />
          )}
          {imageUrl ? (
            <label
              htmlFor="itemImg"
              className="bg-slate/900/50 border-2 border-slate/900 rounded-full flex flex-col justify-center items-center w-[64px] h-[64px] absolute bottom-[16px] right-[16px] cursor-pointer"
            >
              <Image src="/edit.png" alt="이미지 수정" width={24} height={24} />
            </label>
          ) : (
            <label
              htmlFor="itemImg"
              className="bg-slate/200 rounded-full flex flex-col justify-center items-center w-[64px] h-[64px] absolute bottom-[16px] right-[16px] cursor-pointer"
            >
              <Image
                src="/plus_B.png"
                alt="이미지 추가"
                width={24}
                height={24}
              />
            </label>
          )}
          <input
            type="file"
            id="itemImg"
            accept="image/*"
            ref={imgRef}
            onChange={(e) => postImg(e)}
            className="hidden"
          />
        </div>

        {/* 메모를 추가할 수 있습니다. */}
        <div className="bg-[url(/memo.png)] rounded-3xl flex flex-col justify-start items-center md:w-[588px] w-full h-[311px] md:ml-[24px] md:mt-0 mt-[24px] p-[24px]">
          <span className="text-amber/900 font-bold">Memo</span>
          <textarea
            typeof="text"
            value={memo}
            onChange={(e) => setMemo(e.currentTarget.value)}
            className="bg-inherit outline-none resize-none text-center w-full h-full mt-[24px]"
          />
        </div>
      </section>

      <section className="flex flex-row md:justify-end justify-center items-center w-full">
        {/* 수정 사항이 반영되고, 할 일 목록 페이지로 이동합니다. */}
        <button
          onClick={() => patchItem()}
          className={`${
            init &&
            init.name === name &&
            init.memo === memo &&
            init.imageUrl === imageUrl &&
            init.isCompleted === isCompleted
              ? "bg-slate/200"
              : "bg-lime-300"
          } border-2 border-slate/900 rounded-3xl shadow-inputbox shadow-slate/900 flex flex-row justify-center items-center w-[165px] h-[52px]`}
        >
          <Image src="/check.png" alt="수정 완료" width={16} height={16} />
          <span className="ml-[4px] font-semibold">수정 완료</span>
        </button>

        {/* 할 일 삭제가 가능하며, 삭제 후 할 일 목록 페이지로 이동합니다. */}
        <button
          onClick={() => deleteItem()}
          className="bg-rose-500 border-2 border-slate/900 rounded-3xl shadow-inputbox shadow-slate/900 flex flex-row justify-center items-center w-[165px] h-[52px] ml-[16px]"
        >
          <Image src="/cancel.png" alt="삭제하기" width={16} height={16} />
          <span className="ml-[4px] font-semibold">삭제하기</span>
        </button>
      </section>
    </main>
  );
}
