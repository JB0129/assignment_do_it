import Link from "next/link";
import { AddItem } from "./AddItem";
import { CheckBox } from "./CheckBox";
import Image from "next/image";

export type Items = { id: number; name: string; isCompleted: boolean };

export default async function Home() {
  // 할 일 목록 불러오기
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/doong9/items`,
    {
      cache: "no-store",
    }
  );
  const isItems = await res.json();

  return (
    <main className="flex flex-col justify-start items-center w-full max-w-[1200px] md:p-[24px] p-[16px]">
      <AddItem isItems={isItems.filter((obj: Items) => !obj.isCompleted)} />

      {/* 진행 중인 할 일과 완료된 할 일을 나누어 볼 수 있습니다. */}
      <section className="flex md:flex-row flex-col justify-start items-start w-full">
        {/* 할 일 목록 */}
        <section className="flex flex-col w-full md:max-w-[588px] max-w-[696px]">
          <Image
            src="/todo.png"
            alt="TO DO"
            width={101}
            height={36}
            className="mt-[43.5px]"
          />
          <ul className="flex flex-col justify-start items-center w-full">
            {isItems.filter((obj: Items) => !obj.isCompleted).length ? (
              isItems
                .filter((obj: Items) => !obj.isCompleted)
                .map((el: Items) => (
                  <li
                    key={el.id}
                    className="border-2 border-slate/900 rounded-[27px] w-full h-[50px] mt-[16px] pl-[12px] flex flex-row justify-start items-center"
                  >
                    <CheckBox el={el} />
                    <Link href={`/items/${el.id}`} className=" ml-[16px]">
                      {el.name}
                    </Link>
                  </li>
                ))
            ) : (
              <div className="flex flex-col justify-start items-center mb-[64px]">
                <Image
                  src="/Todo_L.png"
                  alt="텅빈 이미지"
                  width={120}
                  height={120}
                  className="mt-[64px] mb-[24px] sm:w-[240px]"
                />
                <span>할 일이 없어요.</span>
                <span>TODO를 새롭게 추가해주세요!</span>
              </div>
            )}
          </ul>
        </section>

        {/* 완료 목록 */}
        <section className="flex flex-col w-full md:max-w-[588px] max-w-[696px] md:ml-[24px]">
          <Image
            src="/done.png"
            alt="DONE"
            width={101}
            height={36}
            className="mt-[48px]"
          />
          <ul className="flex flex-col justify-start items-center w-full">
            {isItems.filter((obj: Items) => obj.isCompleted).length ? (
              isItems
                .filter((obj: Items) => obj.isCompleted)
                .map((el: Items) => (
                  <li
                    key={el.id}
                    className="bg-violet-100 border-2 border-slate/900 rounded-[27px] w-full h-[50px] mt-[16px] pl-[12px] flex flex-row justify-start items-center"
                  >
                    <CheckBox el={el} />
                    <Link
                      href={`/items/${el.id}`}
                      className="line-through ml-[16px]"
                    >
                      {el.name}
                    </Link>
                  </li>
                ))
            ) : (
              <div className="flex flex-col justify-start items-center mb-[64px]">
                <Image
                  src="/Done_L.png"
                  alt="텅빈 이미지"
                  width={120}
                  height={120}
                  className="mt-[64px] mb-[24px] sm:w-[240px]"
                />
                <span>아직 다 한 일이 없어요.</span>
                <span>해야 할 일을 체크해보세요!</span>
              </div>
            )}
          </ul>
        </section>
      </section>
    </main>
  );
}
