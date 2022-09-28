import CustomImage from "@/src/components/simples/CustomImage.js";
import useCategory from "@/src/hooks/useCategory.js";
import Skeleton from "react-loading-skeleton";

export default function BookItem({ book }) {
	const { data: category } = useCategory(book?.category_id);

	return (
		<div className="flex flex-col text-left">
			<CustomImage className="w-full aspect-[2/3]" src={book?.cover_url} />
			<div className="mt-3 font-semibold">
				{book?.authors.join(", ") ?? <Skeleton width={"87%"} />}
			</div>
			<div className="text-sm mt-1">
				{category?.name ?? <Skeleton width={"70%"} />}
			</div>
		</div>
	);
}
