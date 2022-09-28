import Navbar from "@/src/components/simples/Navbar.js";

export default function Screen({ children }) {
	return (
		<div className="flex flex-col">
			<Navbar />
			<div className="p-5 pt-0 sm:pt-5 sm:pb-10 container mx-auto max-w-[1024px]">
				{children}
			</div>
		</div>
	);
}
