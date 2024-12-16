# Multi-Vendor Marketplace Platform

A modern e-commerce platform built with Next.js that allows users to create and manage their own stores.

## Features

- 🏪 Create and manage stores
- 📦 Add and manage products within stores
- 🔍 Explore different stores and products
- 🛍️ User-friendly interface for both store owners and customers
- 🔒 Secure authentication system

## Getting Started

First, set up your environment variables by creating a `.env` file with the necessary configurations.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app/store/[storeId]` - Individual store pages and product management
- `/app/explore` - Browse and discover stores
- `/components` - Reusable UI components
- `/lib` - Utility functions and type definitions

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- Modern authentication system
- Database integration for store and product management

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](https://choosealicense.com/licenses/mit/)
