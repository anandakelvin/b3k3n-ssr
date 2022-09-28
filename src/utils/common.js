export default class CommonUtils {
	static classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}
	static formatAudioLength(length) {
		if (length < 60) {
			return `${length} second${length > 1 && "s"}`;
		} else {
			return `${Math.round(length / 60)} minute${
				Math.round(length / 60) && "s"
			}`;
		}
	}
}
