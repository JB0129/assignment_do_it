import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-white border-2 border-b-gray-200 w-full sticky top-0">
      {/* ‘로고’ 버튼을 클릭하면 ‘/’ 페이지로 이동합니다. */}
      <Link href="/">
        <Image
          src="/Logo_L.png"
          alt="메인 로고"
          className="hidden md:block my-[10px] ml-[16px]"
          width={151}
          height={40}
        />
        <Image
          src="/Logo_S.png"
          alt="메인 로고"
          className="block md:hidden my-[10px] ml-[16px]"
          width={71}
          height={40}
        />
      </Link>
    </header>
  );
}
