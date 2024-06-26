import { ChevronRight, MapPinIcon, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = [
  {
    section: "About",
    links: [
      // {
      //   title: "About us",
      //   link: "/about",
      // },
      {
        title: "Business",
        link: "/business",
      },
      {
        title: "Content Gudielines",
        link: "/",
      },
      {
        title: "Terms of Service",
        link: "/",
      },
      {
        title: "Privacy Policy",
        link: "/",
      },
    ],
  },
  {
    section: "Discover",
    links: [
      {
        title: "Business Nearby",
        link: "/business",
      },
    ],
  },
  {
    section: "Business",
    links: [
      {
        title: "By Category",
        link: "/business",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="flex flex-col pt-24">
      <div className="mx-auto flex w-full max-w-screen-xl flex-wrap items-start justify-between gap-12 px-8">
        {FOOTER_LINKS.map((footer) => (
          <section key={footer.section}>
            <h3 className="text-xl font-bold">{footer.section}</h3>
            <ul className="mt-4 list-none space-y-4">
              {footer.links.map((link) => (
                <li
                  key={link.title}
                  className="group relative flex cursor-pointer text-sm font-medium hover:text-primary"
                >
                  <ChevronRight className="absolute -left-1 size-5 text-primary opacity-0 delay-100 duration-500 group-hover:opacity-100" />
                  <Link
                    href={link.link}
                    className="transition-transform duration-500 group-hover:translate-x-4"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section>
          <h3 className="text-xl font-bold">Contact Info</h3>
          <ul className="mt-4 list-none space-y-4 text-sm font-medium">
            <li className="flex items-center space-x-2">
              <MapPinIcon className="size-4 text-primary" />
              <address className="not-italic">
                11260 Roger Bacon Dr STE 205, Reston, VA 20190
              </address>
            </li>
            <li>
              <Link
                href="tel:+15713063981"
                className="flex items-center space-x-2 duration-500 hover:text-primary"
              >
                <PhoneCall className="size-4 text-primary" />
                <span>+1 (571) 306-3981</span>
              </Link>
            </li>
          </ul>
        </section>
      </div>
      <section className="relative min-h-48 w-full overflow-visible md:min-h-64 lg:min-h-96">
        <Image
          src="/assets/img/subtle-prism.svg"
          fill
          alt=""
          className="object-fill opacity-40 blur filter"
        />
        <div className="absolute top-0 w-full">
          <div className="mx-auto mt-16 h-2 max-w-screen-xl px-8" />
          <p className="mt-4 text-center text-sm font-medium">
            © {new Date().getFullYear()}{" "}
            <span className="text-primary">Chautary</span> All rights reserved.
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
