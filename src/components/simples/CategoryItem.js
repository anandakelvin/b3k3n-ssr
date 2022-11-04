import CommonUtils from "@/src/utils/common.js";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import Skeleton from "react-loading-skeleton";

export default function CategoryItem({ category }) {
	const router = useRouter();
	const categoryId = router.query.categoryId ?? 1;

	if (category) {
		return (
			<Link href={`/${category.id}`} scroll={false}>
				<button
					key={category.id}
					className={CommonUtils.classNames(
						"p-1 px-2 sm:p-2 sm:px-3 border-[1.5px] text-left rounded-lg text-xs sm:text-base",
						category.id == categoryId
							? "bg-primary text-white border-primary"
							: "border-gray-400"
					)}
				>
					{category.name}
				</button>
			</Link>
		);
	} else {
		return <Skeleton height={40} width={150} borderRadius={12} />;
	}
}
