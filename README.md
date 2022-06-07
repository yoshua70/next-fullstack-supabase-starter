# Next Fullstack Supabase Starter
Next.js + Prisma + TailwindCSS + (Type-)Graphql + Apollo + Supabase

## Features
- ORM with [Prisma](https://www.prisma.io/)
- Resolvers generated with Prisma and [Type-Graphql](https://typegraphql.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) integration
- GraphlQL server with [Apollo](https://www.apollographql.com/)

## How to use
Using yarn :
```bash
$ yarn create next-app [app-name] -e [this-repo-url]
```
That's it !

## Documentation
### Prerequisites
Copy content inside of `.env.example` to `.env`.
Add the database url. Supabase provides one under `Settings/Database`. Don't forget to [_percentage encode_](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding) your password if it contains special characters.

### Development
```bash
# Install dependecies
$ yarn

# Apply migrations
$ yarn prisma migrate dev --name init

# Generate resolvers
$ yarn prisma generate

# Start Next.js
$ yarn dev
```

### Folder structure
```bash
graphql
  |-- mutations # Graphql mutations files.
  |-- queries # Graqphql queries files.
  |-- resolvers
        |-- custom # Custom resolvers.
        |-- generated
              |-- type-graphql # Resolvers generated by prisma and type-graphql
helpers # Generic helpers folders for things such as constants and function to be re-used throughout the project.
lib # External libraries for import in other files.
```

### Coding style
#### Import
The `baseUrl` is set to the root of the project. You can directly import without worrying about relative path.

#### Variable casing
There are no components yet, but they should be in PascalCase or camelCase.

#### Filename casing
React components should be in PascalCase, pages and other files in kebab-case.

### Supabase
The supabase client can be found inside of lib/supabase-client.ts. You can then import inside of your files :
```ts
import {supabase} from "lib/supabase-client"
```

