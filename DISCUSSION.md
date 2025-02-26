# Discussion

## Improvements overview
My focus on this project was to get the application working and fix any big issues, update all the dependencies to the latest releases, and integrate a flexible and well-testing component library in `shadcn-ui` to style things quickly and maintain a consistent design.

I also moved the client-side filtering to the API to reduce the amount of data sent to the client and improve performance on the client, with the assumption being that the list of advocates would grow to hundreds of thousands. There's a debounce on the search input too to reduce the number of requests sent to the API as a user types.

Additionally, I wanted to break up each improvement into digestible and atomic PRs, rather than do one gigantic PR all at once.

### Specific changes

[PR #1](https://github.com/jdk2pq/solace-candidate-assignment/pull/1)
- Fixed an issue with the <thead> and <tr>/<th> elements that was called out by React where <th> cannot be a child of <thead> and will cause a hydration error
- Added `key` prop to each child in the list of advocates and specialties to address an error called out by React
- Added the `.idea` folder to the `.gitignore` since I use the IntelliJ IDE
- Added a type for `Advocate` to have typed data and benefit from Intellisense in the IDE
- Made the search input a controlled element and added a new state variable for `searchTerm`, instead of setting that data dynamically in the `onChange` function
- Removed `console.log()` statements since they were not needed
- Updated search term filtering to be case-insensitive to be easier to filter down to the result the user is looking for, without exactly matching the case

[PR #2](https://github.com/jdk2pq/solace-candidate-assignment/pull/2)
- Ran the `@tailwindcss/upgrade` command to get Tailwind v4 working
- Added some very basic classes to verify Tailwind was working correctly and make the site look slightly better

[PR #3](https://github.com/jdk2pq/solace-candidate-assignment/pull/3)
- Updated to Next v15 using their migration codemods
- Updated to the latest versions of the remaining dependencies
- Pinned all versions of dependencies in the `package.json` for consistent versioning across environments

[PR #4](https://github.com/jdk2pq/solace-candidate-assignment/pull/4)
- Added `shadcn/ui` as a quick and good-looking component library option and integrated a few components into the application
- Factored out an `AdvocatesTable` component to clean up `page.tsx` some

[PR #5](https://github.com/jdk2pq/solace-candidate-assignment/pull/5)
- Instead of doing client-side filtering, where we may have up to hundreds of thousands of advocates to search through, we now do the filtering server-side for faster performance and less load on the browser with a very large database of advocates
- Added a loading state after a user types in a search query and the API call is being retrieved to give the user information on the loading state of the application
- Move search input to top right of the page to follow typical web design and added `autofocus` attribute
- Added phone number formatting to the table for an improved user experience in reading the phone numbers
- Joined the `specialties` array into a single string in the table to take up less vertical space on the page


[PR #6](https://github.com/jdk2pq/solace-candidate-assignment/pull/6)
- Added dark mode support using shadcn and Tailwind v4 to improve the UI, and it will use the user's system default
- Factored out an `AdvocatesTableRow` component and made all phone numbers links that can be clicked using the `tel:` link type

## Next steps

I did try to stick to the time limit of 2 hours, so some ideas for next steps in the project are:

- Add unit tests to the API and components
- Test with a database with hundreds of thousands of advocates to verify performance
- Add pagination and result size options to the table, instead of returning all options at once from the API every time
- Use something like TanStack Query for better data fetching, caching, and state management
- Highlight the search term in the table results by bolding the keywords or highlighting them
- Add individual pages for each advocate with more details about that specific advocate
- Add an ID for each advocate and use that as a `key` prop in the table rows, as well as the ID in the URL for the individual advocate pages
- Even more design improvements, since it's still fairly basic at this point, but it's a decent start and improvement over the original implementation