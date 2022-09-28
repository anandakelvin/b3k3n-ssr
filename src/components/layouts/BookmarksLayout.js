import Screen from "@/src/components/composites/Screen.js";
import BookItem from "@/src/components/simples/BookItem.js";
import Link from "next/link.js";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function BookmarksLayout() {
	const [search, setSearch] = useState("");

	const books = useSelector((state) => state.bookmarks.value);

	const filteredBooks = books.filter(
		(e) =>
			search.length === 0 ||
			e.title.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<Screen>
			<h2 className="mb-5">Your Bookmarks</h2>
			<>
				{books.length === 0 ? (
					<Centered>
						<div>Your bookmarks is empty</div>
					</Centered>
				) : (
					<>
						<div className="mb-7">
							<div className="flex items-center gap-5 p-3 px-5 border-[1.5px] rounded-lg border-gray-400">
								<BsSearch />
								<input
									type="text"
									placeholder="Search your bookmarks"
									className="w-full focus:outline-none"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 my-5">
							{filteredBooks.map((e) => (
								<Link
									key={e.id}
									href={`/${e.category_id}/${e.categoryPageIndex}/${e.id}`}
								>
									<a>
										<BookItem book={e} />
									</a>
								</Link>
							)) ?? [...Array(9)].map((e, n) => <BookItem key={n} />)}
						</div>{" "}
					</>
				)}
			</>
		</Screen>
	);
}

function Centered({ children }) {
	return (
		<div className="flex justify-center h-48">
			<div className="flex flex-col justify-center">{children}</div>
		</div>
	);
}
