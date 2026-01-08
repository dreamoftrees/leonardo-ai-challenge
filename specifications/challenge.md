# Leonardo.AI Frontend Challenge

Build a Next.js application that gates content behind a user profile form and displays paginated data from a GraphQL API.

## Technical Requirements

### Stack
- Next.js with App Router and TypeScript
- shadcn/ui for UI components
- Tailwind CSS for styling
- Apollo Client for GraphQL queries
- Git for version control
- pnpm for package management

### Core Features

#### 1. User Profile Gate
- Create a blocking element page `src/app/login` that prevents access to all other pages and data. Define a login form within `src/components/login-form` that can be reused elsewhere as required.
- Collect **username** and **job title** from the user
- Add form validation for required inputs using `react hook form` with zod scema resolvers
- Persist this data between page reloads (e.g., localStorage)

#### 2. Information Page
- Create a new page `/src/app/information` that shows images in a grid
- Query the GraphQL API (https://rickandmortyapi.com/graphql) that returns data for the images
- Only fetch data **after** user has entered their profile information
- Display data as a paginated list on an "Information Page"
- Support direct URL linking to specific pages of paginated data (e.g., `?page=2`)

#### 3. Information Detail Modal
- Clicking an item in the information page opens a modal displaying that item's full information
- Create a information detail modal via parallel route `@modal` supporting an id for the item lookup

#### 4. Header with User Information
- Create a Header component used in layout that shows with the Information pages.
- Display the `public/leonardo-logo-text.svg` on the left and username and title on the right.
- When clicking on the right side information/avatar link to a new `settings` page.

#### 5. Settings Page
- Create a settings page `src/app/settings`
- Reuse the login form to show the user the username and job title saved.
- Allow editing of the username and job title to be saved.
- Include a logout button that flushes the username and job title information.

#### 5. Layout
- Responsive design for mobile and desktop
- Footer component displaying the challenge version `v3.5`

## Guidelines
- Document code appropriately
- Minimize dependencies
- Prioritize user experience, accessibility, and production-quality code
