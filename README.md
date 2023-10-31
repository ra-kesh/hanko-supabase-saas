# Hanko Supabase Next.js Example App

An open source example application built using Hanko, Supabase and the new App router in Next.js 14.

# Tech stack

- [Hanko](https://hanko.io): For passwordless authentication.
- [Supabase](https://supabase.io): As the PostgreSQL Database
- [Next.js 14](https://nextjs.org): For Frontend and Backend
- [TypeScript](https://www.typescriptlang.org): To add static typing to JavaScript.
- [Prisma](https://www.prisma.io): For database access and ORM.
- [Tailwind CSS](https://tailwindcss.com): For easy and customizable styling.

- [Tiptap](https://tiptap.dev/): For notion style wyswyg note editor

## Getting Started

### Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/ra-kesh/hanko-supabase-saas
```

2. Navigate to the project directory:

```
cd hanko-supabase-saas
```

3. Install the project dependencies:

```
yarn
```

4. Create a .env.local file in the root directory and configure your environment variables.

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL=your-postgresql-database-url-from-supabse
HANKO_API_KEY=your-hanko-api-key
```

5. Generate Prisma client code and apply database migrations:

```
npx prisma generate
npx prisma migrate dev
```

6. start the dev server

```
yarn run dev
```

## Roadmap

- [ ] Note editor performance enhancement
- [ ] Build better marketing page
- [ ] Subscriptions using Stripe
- [ ] Responsive styles
- [ ] Add OG images and metadata
- [ ] Dark mode
- [ ] Stripe
- [ ] Better error handling
- [ ] Better ts support

## License

Licensed under the [MIT license](https://github.com/ra-kesh/hanko-supabase-saas/blob/main/LICENSE.md).
