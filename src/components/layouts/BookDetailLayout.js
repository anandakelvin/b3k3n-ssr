import Screen from "@/src/components/composites/Screen.js";
import { useGetBooksByCategoryIdAndPageIndexQuery } from "@/src/services/b3k3n.js";
import { useRouter } from "next/router.js";
import { BiHeadphone } from "react-icons/bi";
import { FiBookOpen } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RiPagesLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import CustomImage from "@/src/components/simples/CustomImage.js";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addOrRemove } from "@/src/features/bookmarks/bookmarksSlice.js";
import CommonUtils from "@/src/utils/common.js";

export default function BookDetailLayout() {
	const bookmarks = useSelector((state) => state.bookmarks.value);
	const dispatch = useDispatch();
	const router = useRouter();
	const { categoryId, pageIndex, bookId } = router.query;
	const { data, error } = useGetBooksByCategoryIdAndPageIndexQuery({
		categoryId,
		pageIndex,
		pageSize: 10,
	});

	useEffect(() => {
		error && toast.error("Error " + error.originalStatus);
	}, [error]);

	const book = data?.find((e) => e.id == bookId);
	return (
		<Screen>
			<div className="sm:flex gap-5 lg:gap-10">
				<div className="sm:mb-0 mb-10 w-[200px] mx-auto sm:w-1/3">
					<CustomImage
						src={book?.cover_url}
						className=" w-full aspect-[2/3]  object-top"
						objectFit="object-contain"
					/>
				</div>
				<div className="sm:w-2/3">
					<div className="flex flex-col sm:flex-col-reverse">
						<div className="grid grid-cols-2 gap-5 sm:mt-4">
							<button
								disabled={!book}
								className="border-2 disabled:opacity-50 border-primary rounded-lg py-2 flex gap-2 justify-center items-center"
							>
								<BiHeadphone />
								<div>Listen</div>
							</button>
							<button
								disabled={!book}
								className="rounded-lg disabled:opacity-50 bg-primary py-2 text-white flex gap-2 justify-center items-center"
							>
								<FiBookOpen />
								<div>Read</div>
							</button>
						</div>
						<div className="mt-7 sm:mt-0">
							<h1>{book?.title ?? <Skeleton />}</h1>
							<h4 className="my-1">
								{book?.authors.join(", ") ?? <Skeleton />}
							</h4>
						</div>
					</div>
					<div className="my-5 sm:my-7">
						<hr />
						<div className="flex gap-5 my-2">
							<div className="flex gap-2 items-center">
								{book ? <RiPagesLine /> : <Skeleton width={40} />}
								<div>
									{book &&
										`${book.sections.length} section${
											book.sections.length > 1 && "s"
										}`}
								</div>
							</div>
							<div className="flex gap-2 items-center">
								{book ? <AiOutlineClockCircle /> : <Skeleton width={40} />}
								<div>
									{book && CommonUtils.formatAudioLength(book.audio_length)}
								</div>
							</div>
							<button
								onClick={() =>
									dispatch(
										addOrRemove({ categoryPageIndex: pageIndex, ...book })
									)
								}
								className="border-[1.5px] ml-auto border-primary rounded-md p-1 px-2 text-xs"
							>
								{bookmarks.find((e) => e.id === book.id)
									? "Remove from"
									: "Add to"}{" "}
								Bookmarks
							</button>
						</div>
						<hr />
					</div>
					<h2>What's it about?</h2>
					<div className="my-3">{book?.description ?? <Skeleton />}</div>
					<h2 className="mt-7">What's inside?</h2>
					<Chapters sections={book?.sections} />
				</div>
			</div>
		</Screen>
	);
}

function Chapters({ sections }) {
	return (
		<div className="mt-2">
			{sections?.map((e, n) => {
				return (
					<div key={n} className="collapse text-left w-full">
						<input type="checkbox" />
						<div className="collapse-title p-0 flex gap-7 items-center text-primary font-semibold">
							<div>{n + 1}</div>
							<div>{e.title}</div>
						</div>
						<div className="collapse-content p-0">{e.content}</div>
						<hr />
					</div>
				);
			}) ?? [...Array(7)].map((e, n) => <Skeleton key={n} className="my-3" />)}
		</div>
	);
}
