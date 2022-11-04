import Navbar from "@/src/components/simples/Navbar.js";

export default function Screen({ children }) {
	return (
		<div className="flex flex-col sm:h-screen">
			<Navbar />
			<div className="p-5 sm:min-h-0 sm:flex-grow pt-0 sm:pt-5 sm:pb-5 container mx-auto max-w-[1024px]">
				{children}
			</div>
		</div>
	);
}
