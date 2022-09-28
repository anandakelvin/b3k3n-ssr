import PaginationLegend from "@/src/components/composites/PaginationLegend.js";
import Screen from "@/src/components/composites/Screen.js";
import BookItem from "@/src/components/simples/BookItem.js";
import CategoryItem from "@/src/components/simples/CategoryItem.js";
import {
	useGetBooksByCategoryIdAndPageIndexQuery,
	useGetCategoriesQuery,
} from "@/src/services/b3k3n.js";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

export default function CategoryDetailLayout() {
	const [search, setSearch] = useState("");

	const router = useRouter();
	const categoryId = router.query.categoryId ?? 1;
	const pageIndex = router.query.pageIndex ?? 0;
	const { data: categories, error: errorCategories } = useGetCategoriesQuery();
	const {
		data: books,
		error: errorBooks,
		isFetching: isFetchingBooks,
	} = useGetBooksByCategoryIdAndPageIndexQuery({
		categoryId,
		pageIndex,
		pageSize: 10,
	});

	useEffect(() => {
		if (errorBooks) {
			toast.error("Contents unavailable, redirecting...");

			(async () => {
				await (async () => {
					return new Promise((resolve) => setTimeout(() => resolve(), 1000));
				})();
				router.push(`/${categoryId}/0`);
			})();
		}
	}, [errorCategories, errorBooks]);

	const filteredBooks = isFetchingBooks
		? null
		: books?.filter(
				(e) =>
					search.length === 0 ||
					e.title.toLowerCase().includes(search.toLowerCase())
		  );

	const selectedCategory = categories?.find((e) => e.id == categoryId);
	return (
		<Screen>
			<div className="flex flex-col sm:flex-row sm:gap-10">
				<div className="sm:w-1/3">
					<h2 className="mb-5">Explore Categories</h2>
					<div className="mb-7 flex flex-wrap gap-3">
						{categories?.map((e) => <CategoryItem key={e.id} category={e} />) ??
							[...Array(7)].map((e, n) => <CategoryItem key={(e, n)} />)}
					</div>
				</div>
				<div className="sm:w-2/3">
					<h2 className="mb-5">
						{selectedCategory?.name ?? <Skeleton width={"35%"} />}
					</h2>
					<div className="mb-7">
						<div className="flex items-center gap-5 p-3 px-5 border-[1.5px] rounded-lg border-gray-400">
							<BsSearch />
							<input
								type="text"
								placeholder="Search this category"
								className="w-full focus:outline-none"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 my-5 mb-10">
						{filteredBooks?.map((e) => (
							<Link key={e.id} href={`/${categoryId}/${pageIndex}/${e.id}`}>
								<a>
									<BookItem book={e} />
								</a>
							</Link>
						)) ?? [...Array(9)].map((e, n) => <BookItem key={n} />)}
					</div>
					<PaginationLegend />
				</div>
			</div>
		</Screen>
	);
}
