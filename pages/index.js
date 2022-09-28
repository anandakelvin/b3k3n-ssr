import { wrapper } from "@/src/app/store.js";
import CategoryDetailLayout from "@/src/components/layouts/CategoryDetailLayout.js";
import {
	getBooksByCategoryIdAndPageIndex,
	getCategories,
	getRunningOperationPromises,
} from "@/src/services/b3k3n.js";

export const getInitialProps = wrapper.getInitialPageProps(
	(store) => async (context) => {
		const categoryId = context.query.categoryId ?? 1;
		const pageIndex = context.query.pageIndex ?? 0;
		store.dispatch(getCategories.initiate());
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

const Page = CategoryDetailLayout;
Page.getInitialProps = getInitialProps;
export default Page;
