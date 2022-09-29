# Overview

### Motivation

I decided to build the app using Next.js Server-side rendering technique with Dynamic routes as I think it would be better if crawlers could get the content on request time, so the books can be indexed and showed in Google results as well. Enjoy the seamless navigation feeling of Client-side rendering with SSR on every initial page request.

### Approach

The fetching queries is implemented using RTK Query because it supports handling state reconciliation between the server and the client via Rehydration, and it handles caching as well. The bookmarks feature is implemented using Redux persist, utilizing localStorage.
The hybrid CSR/SSR data fetching technique is implemented inside every Page.getInitialProps as getInitialProps in invoked both in client when navigating and server during initial page load.

# Crawlers Perspective

Contents are pre-rendered from the server on every initial request so we could benefit crawlability.

![Alt text](screenshots/category_detail.png?raw=true)

![Alt text](screenshots/book_detail.png?raw=true)

# API Feedback

### Overall response

Consider returning response shaped like the following:

```
{
		"meta": {
			"status": 200,
			"message": "OK"
		},
		"data": {
			"result": [...],
			"page": 1,
			"size": 10,
			"last_page": 13,
			"total": 121,
		}
}
```

- Consistent shape makes serialization easier and more readable
- Accomodate sufficient data to implement pagination (page, size, total, last_page, or at least next_page_url)
- Least page index should be 1 instead of 0

### Feature

- The API should provide single endpoint to GET a book by bookId. It would make implementing server-side rendering more straightforward without the need to fetch a list of books
- The API should provide sort and search query parameter.

### Data

- Image data should provide multiple sizes with each metadata such as aspect_ratio, etc.
- Should return empty result as array instead of 404

### URL

Slash at the end of url should not cause the page query parameter to fallback to 10
