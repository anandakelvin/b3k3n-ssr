import { useGetCategoriesQuery } from "@/src/services/b3k3n.js";
import { useRouter } from "next/router.js";

export default function useCategory(categoryId) {
	const router = useRouter();
	const { data, isFetching, isError } = useGetCategoriesQuery();

	const category = data?.find((e) => e.id == categoryId);
	return { data: category, isFetching, isError };
}
