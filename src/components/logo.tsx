import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/assets/img/logo.webp"
        height={30}
        width={130}
        alt="chautary"
        className="h-10 shrink-0 object-contain"
        quality={100}
      />
    </Link>
  );
};

export default Logo;
