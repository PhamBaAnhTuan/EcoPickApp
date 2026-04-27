// src/hooks/useLayout.ts
import { Platform, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useLayout = (topTabHeight: number = 0) => {
	const { height, width } = useWindowDimensions();
	const insets = useSafeAreaInsets();
	const bottomTabHeight = Platform.OS === 'ios' ? 60 + insets.bottom : 80 + insets.bottom

	const fullscreenHeight = height - bottomTabHeight - topTabHeight;

	return {
		height,
		width,
		fullscreenHeight,
		insets,
		bottomTabHeight,
		topTabHeight,
	};
};
