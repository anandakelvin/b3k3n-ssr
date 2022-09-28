import CommonUtils from "@/src/utils/common.js";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function PaginationLegend() {
	const router = useRouter();
	const categoryId = router.query.categoryId ?? 1;
	const rawPageIndex = router.query.pageIndex ?? 0;
	const pageIndex = parseInt(rawPageIndex);

	const pages =
		pageIndex < 2
			? [0, 1, 2, 3, 4]
			: [pageIndex - 2, pageIndex - 1, pageIndex, pageIndex + 1, pageIndex + 2];

	return (
		<div className="flex items-center justify-between border-t border-gray-200 bg-white py-3">
			<div className="flex flex-1 items-center justify-between">
				<div className="mx-auto">
					<nav
						className="isolate inline-flex -space-x-px rounded-md shadow-sm"
						aria-label="Pagination"
					>
						<Link
							href={`/${categoryId}/${pageIndex === 0 ? 0 : pageIndex - 1}`}
							scroll={false}
						>
							<a className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
								<span className="sr-only">Previous</span>
								<BiChevronLeft className="h-5 w-5" aria-hidden="true" />
							</a>
						</Link>
						{pages.map((e) => (
							<Link key={e} href={`/${categoryId}/${e}`} scroll={false}>
								<a>
									<Node key={e} isActive={pageIndex === e}>
										{e}
									</Node>
								</a>
							</Link>
						))}
						<Link href={`/${categoryId}/${pageIndex + 1}`} scroll={false}>
							<a className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
								<span className="sr-only">Next</span>
								<BiChevronRight className="h-5 w-5" aria-hidden="true" />
							</a>
						</Link>
					</nav>
				</div>
			</div>
		</div>
	);
}

function Node({ isActive, children }) {
	return (
		<div
			className={CommonUtils.classNames(
				"relative inline-flex items-center border px-3 sm:px-4 py-2 text-sm font-medium focus:z-20",
				!isActive
					? "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
					: "z-10 border-indigo-500 bg-indigo-50 text-indigo-600 "
			)}
		>
			{children}
		</div>
	);
}
