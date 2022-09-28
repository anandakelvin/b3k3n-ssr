import { wrapper } from "@/src/app/store.js";
import BookDetailLayout from "@/src/components/layouts/BookDetailLayout.js";
import {
	getBooksByCategoryIdAndPageIndex,
	getRunningOperationPromises,
} from "@/src/services/b3k3n.js";

export const getInitialProps = wrapper.getInitialPageProps(
	(store) => async (context) => {
		const categoryId = context.query.categoryId ?? 1;
		const pageIndex = context.query.pageIndex ?? 0;
		store.dispatch(
			getBooksByCategoryIdAndPageIndex.initiate({
				categoryId,
				pageIndex,
				pageSize: 10,
			})
		);
		await Promise.all(getRunningOperationPromises());
		return {
			props: {},
		};
	}
);

const Page = BookDetailLayout;
Page.getInitialProps = getInitialProps;
export default Page;
