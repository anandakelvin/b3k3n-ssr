import Skeleton from "react-loading-skeleton";
import CommonUtils from "@/src/utils/common.js";

export default function CustomImage({ src, objectFit, className }) {
	return src ? (
		<img
			src={src}
			className={CommonUtils.classNames(
				objectFit ?? "object-cover",
				"rounded-lg",
				className
			)}
		/>
	) : (
		<div
			className={CommonUtils.classNames(className, "relative overflow-hidden")}
		>
			<Skeleton
				borderRadius={10}
				style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
			/>
		</div>
	);
}
