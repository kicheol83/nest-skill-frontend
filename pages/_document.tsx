import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="index,follow" />
        <link
          rel="icon"
          type="image/png"
          href="/skill-nest-icons/nest-skill-logo.svg"
        />

        {/* SEO */}
        <meta
          name="keyword"
          content={
            "Skill Nest, service marketplace, post a service, freelancers, plumbers, tutors, cleaners, pet care, car sharing, trusted professionals, hire local services"
          }
        />
        <meta
          name={"description"}
          content={
            "Skill Nest is a modern platform where skilled workers like plumbers, tutors, pet sitters, and more can post their services and connect with clients directly. Easy, secure, and trusted. |" +
            "Skill Nest — это современная платформа, где специалисты, такие как сантехники, репетиторы, няни для животных и другие, могут размещать свои услуги и напрямую находить клиентов. Удобно, безопасно и надежно. |" +
            "Skill Nest는 배관공, 과외 교사, 반려동물 돌보미 등 숙련된 전문가들이 직접 자신의 서비스를 등록하고 고객과 연결할 수 있는 현대적인 플랫폼입니다. 쉽고, 안전하며, 신뢰할 수 있습니다. |" +
            "Skill Nest — bu zamonaviy platforma bo‘lib, unda santexnik, repetitor, hayvon parvarachisi kabi malakali mutaxassislar o‘z xizmatlarini joylab, mijozlar bilan to‘g‘ridan-to‘g‘ri bog‘lanishlari mumkin. Oson, xavfsiz va ishonchli."
          }
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
