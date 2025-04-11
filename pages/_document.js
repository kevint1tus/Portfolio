import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kevin Titus",
              "url": "https://www.titusk.me",
              "sameAs": [
                "https://www.linkedin.com/in/kevint1tus/",
                "https://github.com/kevint1tus",
                "https://twitter.com/kevint1tus",
                "https://www.instagram.com/kevint1tus/"
              ],
              "jobTitle": "Software Engineering Student",
              "worksFor": {
                "@type": "Organization",
                "name": "University of Birmingham"
              },
              "description": "Computer Science and Software Engineering student at the University of Birmingham, specializing in full-stack development and modern web technologies.",
              "image": "https://res.cloudinary.com/dihjlsqxb/image/upload/v1703196507/Site_jfoasf.png",
              "alumniOf": {
                "@type": "Organization",
                "name": "University of Birmingham"
              }
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
