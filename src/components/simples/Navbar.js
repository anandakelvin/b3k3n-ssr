import Link from "next/link.js";
import { useRouter } from "next/router.js";

export default function Navbar() {
	return (
		<header>
			<div className="p-5 container max-w-[1024px] mx-auto flex items-center justify-between">
				<Link href="/">
					<button>
						<img
							src="https://sejutacita.id/static/media/logo-bg-new.14982478.png"
							width={100}
						/>
					</button>
				</Link>
				<div className="flex items-center gap-3 text-xs sm:text-base">
					<Link href="/">
						<a>Categories</a>
					</Link>
					<Link href="/bookmarks">
						<a>Bookmarks</a>
					</Link>
				</div>
			</div>
		</header>
	);
}
