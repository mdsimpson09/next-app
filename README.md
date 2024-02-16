This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Typescript was used due to Nextjs having a built in support or automatically isntalling needed packages and configuring proper settings. There is also a useful typescript plugin 

Prisma is developer friendly and easy to use. It also has a transparent development process that is visible on Github. 

Postgresql was used due to its popularity and well-regarded open-source relational databses. It has a large list of features in regards to performance, security, programming extentions and configuration. 

React Icons were used throughout the app 

radix-ui was used to create cohesive sign-up, login, and editing forms. It also has a good documentation and examples.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Cypress is used for E2E testing due to React docs stating that, since async server components are new to react, some tools are not fully supported, so they recommend end-to-end testing over unit testing. 

tests were run and stored on the cypress cloud. 124 passed and 0 failed tests 

https://cloud.cypress.io/projects/9v8q98/analytics/runs-over-time
