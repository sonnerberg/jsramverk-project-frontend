# Frontend [jsramverk.se - Projekt](https://jsramverk.se/project)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/sonnerberg/jsramverk-project-frontend/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/sonnerberg/jsramverk-project-frontend/?branch=main) [![Code Coverage](https://scrutinizer-ci.com/g/sonnerberg/jsramverk-project-frontend/badges/coverage.png?b=main)](https://scrutinizer-ci.com/g/sonnerberg/jsramverk-project-frontend/?branch=main) [![Build Status](https://scrutinizer-ci.com/g/sonnerberg/jsramverk-project-frontend/badges/build.png?b=main)](https://scrutinizer-ci.com/g/sonnerberg/jsramverk-project-frontend/build-status/main) [![Build Status](https://travis-ci.com/sonnerberg/jsramverk-project-frontend.svg?branch=main)](https://travis-ci.com/sonnerberg/jsramverk-project-frontend)

## Technology choices

During the start of the summer of 2020 I came across a book that I found very interesting
which is called [JavaScript Everywhere](https://www.oreilly.com/library/view/javascript-everywhere/9781492046974/).
During the same time period I came across GraphQL for the first time in the Massive Open Online Course (MOOC)
[FullstackOpen](https://fullstackopen.com/en/part8). When it came time for the project in the course
[jsramverk.se](https://jsramverk.se/) I decided to try to make use of Apollo and GraphQL, both tools
being described in both JavaScript Everywhere and at FullstackOpen.

The reason for choosing GraphQL over REST is mostly because I think GraphQL seems to be an interesting
technology that I wanted to try out. This project felt like a good opportuinty to get my feet wet.

### [@apollo/client - npm](https://www.npmjs.com/package/@apollo/client)

To consume my GraphQL backend I have used `@apollo/client` as it was described in both
[JavaScript Everywhere](https://www.oreilly.com/library/view/javascript-everywhere/9781492046974/)
and at [FullstackOpen](https://fullstackopen.com/en/part8).

While developing my frontend I learned first hand about how fast the JavaScript
eco system changes. Even though the book JavaScript Everywhere is quite new it used
a technique called `writeData` that since then has been deprecated. I had to resort to reading
the documentation and instead use `writeQuery` and `readQuery`.

Something else had also changed since the version of Apollo used in the book and that was that
the use of `useQuery` together with pushing the user to another page using `history` in `react-router-dom`
would give errors. I had to read up about how to sort this behaviour out and ultimaltely used a
trick with `useLazyQuery`. This presented another issue as the lazy query would not keep my pages
updated.

This led me to having to use the Apollo cache a lot for updating my components. This felt similar
to what I had previously done using [redux - npm](https://www.npmjs.com/package/redux) and in the end
the results are good as the application works with fewer requests sent to the server.

### [apollo-link-context - npm](https://www.npmjs.com/package/apollo-link-context)

This package was described in
[JavaScript Everywhere](https://www.oreilly.com/library/view/javascript-everywhere/9781492046974/)
and is used to use a header for requests to check that a user is authenticated.

### [d3 - npm](https://www.npmjs.com/package/d3)

`d3` was used to create graphs of the real time prices of stocks changing. I had earlier come across
`d3` at [freeCodeCamp](https://www.freecodecamp.org/) and was fortunate
to find some good YouTube-tutorials for how to use `d3` with React hooks.

### [normalize-url - npm](https://www.npmjs.com/package/normalize-url)

`normalize.css` is used to reset styles for the application to have a clean slate to work from.

### [react - npm](https://www.npmjs.com/package/react) and [react-router-dom - npm](https://www.npmjs.com/package/react-router-dom)

React is my framework of choice. This is mostly due to its popularity and the fact that I had learned some
React at [freeCodeCamp](https://www.freecodecamp.org/) and [Full stack open 2020](https://fullstackopen.com/en)
prior to starting this course.

I want to dig in to React before attempting to use other frameworks like Vue or Angular.

### [styled-components - npm](https://www.npmjs.com/package/styled-components)

`styled-components` are used to style my appication. I have used it earlier in
[Full stack open 2020](https://fullstackopen.com/en).

I think that I would have gotten a more
aesthetically pleasing result by using something like [react-bootstrap - npm](https://www.npmjs.com/package/react-bootstrap)
[@material-ui/core - npm](https://www.npmjs.com/package/@material-ui/core) or
[@chakra-ui/core - npm](https://www.npmjs.com/package/@chakra-ui/core).

But I still decided to dig deeper into `styled-components` and do things "myself".

I really like how it is possible to create scoped styles and the ability to use a ThemeProvider to
conditionally apply styles.

### [styled-icons - npm](https://www.npmjs.com/package/styled-icons)

I have only used in icon from this package so it is actually way to large to use but I still
feel that it is worthful to know how to use the package.

### [uuid - npm](https://www.npmjs.com/package/uuid)

I have used the `uuid` package to create keys for react components that are unique.

### [cypress - npm](https://www.npmjs.com/package/cypress)

Even though the use of `selenium` has been suggested in the course I decided to instead use
`cypress`. I came across `cypress` in [Full stack open 2020](https://fullstackopen.com/en) and
I prefer it over `selenium` mainly because the docs are a lot easier to read.

Another advantage of `cypress` is that it is fairly easy to get code coverage,
something I was not able to pull off when trying out `selenium` earlier.

## Test use cases

- Register users

- Log in user

- Log out user

- Buy stocks

- Sell stocks

- Deposit funds

## Attribution

- “JavaScript Everywhere by Adam D. Scott (O’Reilly). Copyright 2020 Adam D. Scott, 978-1-492-04698-1.”

- [The Muratorium - Using React (Hooks) with D3](https://www.youtube.com/playlist?list=PLDZ4p-ENjbiPo4WH7KdHjh_EMI7Ic8b2B)

- [Fullstackopen - Part 8 (GrahpQL)](https://fullstackopen.com/en/part8)

- [Freecodecamp](https://www.freecodecamp.org/news/how-to-keep-your-footer-where-it-belongs-59c6aa05c59c/)
