# thoughts

Developed with Next.js and React, the microblogging platform showcases modern
design and essential functionalities for seamless expression and interaction.

## Features

- User authentication
- Posting content
- Commenting on posts
- Liking and unliking posts
- Liking and unliking comments
- User profiles
- Follow/unfollow functionality
- Real-time updates
- Responsive design
- Search functionality
- Main feed flow (Chronological and integrating newly created posts)

## Installation

Copy and paste the following commands into your terminal:

```bash
# Clone the repository
git clone https://github.com/berkaycanboga/thoughts

# Navigate to the project directory
cd thoughts

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Configuration

Before using the app, make sure to set up your environment variables. Check the
following files for examples and instructions:

- `.env.example`: Main environment variables example
- `.env.local.example`: Local environment variables example for development

⚠️ **Warning:** If you modify your environment files and do not use the provided
examples, ensure to adjust the Next.js configuration accordingly. The default
values in the configuration assume alignment with the examples. Any deviations
may require manual adjustments.

### Fixing API Route Conflicts on Vercel

If you're encountering issues with the `baseurl/[username]/[postId]` route and
unexpected conflicts in the API path `/[username]/api/...` and didn't change or
apply different API or any structure that may affect API, you need to keep
current `vercel.json` file rewrite rule. This will change API route to `/api/`
properly.

### Getting Started

1. Copy the example files:

   ```bash
   # Main environment variables
   cp .env.example .env

   # Local environment variables (development)
   cp .env.local.example .env.local
   ```

2. Open the copied files in your preferred text editor and configure the
   variables according to your needs.

3. Ensure you **never** commit your actual `.env` and `.env.local` files
   containing sensitive information.

By setting up these environment files, you can customize the app for your
specific needs and keep sensitive information secure.

## Scripts

Here are the available scripts in the project:

```bash
# Start the development server
npm run dev

# Generate Prisma client and build the Next.js application
npm run build

# Start the production server
npm run start

# Run Jest tests
npm test

# Run ESLint for code linting
npm run lint
```

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth](https://next-auth.js.org/)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)
- [Date-fns](https://date-fns.org/)
- [Formik](https://formik.org/)
- [React Icons (Bootstrap Icons)](https://react-icons.github.io/react-icons/icons/bs/)
- [Argon2](https://github.com/ranisalt/node-argon2)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## Project Homepage

- **Live Demo:** [thoughts](https://thghts.vercel.app/)

## Contact

- **Author:** Berkay Can Boga
- **GitHub:** [Berkay Can Boga's GitHub](https://github.com/berkaycanboga/)
