// src/hooks/useLayout.ts
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useLayout = (topTabHeight: number = 0) => {
	const { height, width } = useWindowDimensions();
	const insets = useSafeAreaInsets();
	const bottomTabHeight = 60 + insets.bottom;

	const headerPostHeight = bottomTabHeight * 0.8;
	const captionHeight = bottomTabHeight * 1.05;
	const contentHeight = height - bottomTabHeight - topTabHeight - captionHeight - insets.top - headerPostHeight;

	const fullscreenHeight = height - bottomTabHeight - topTabHeight;

	return {
		height,
		width,
		fullscreenHeight,
		contentHeight,
		captionHeight,
		headerPostHeight,
		insets,
		bottomTabHeight,
		topTabHeight,
	};
};
