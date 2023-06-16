import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import { useLocalStorage } from "@hooks";
import { getDesignTokens } from "@styles";

type ThemeState = {
	mode: PaletteMode;
	toggleMode: () => void;
};

type ThemeActions = "TOGGLE_MODE";

type ThemeAction = {
	type: ThemeActions;
	payload?: any;
};

type ThemeContextType = {
	state: ThemeState;
	toggleMode: () => void;
};

const initialState: ThemeState = {
	mode: "dark",
	toggleMode: () => undefined,
};

const setSearchMethods = {
	TOGGLE_MODE: (state: ThemeState, payload: PaletteMode) => {
		return {
			...state,
			mode: payload,
		};
	},
};

const themeReducer = (state: ThemeState, action: ThemeAction) => {
	return setSearchMethods[action.type](state, action.payload);
};

const ThemeContext = React.createContext<ThemeContextType>({
	state: initialState,
	toggleMode: () => undefined,
});

const ThemeProviderContext: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = React.useReducer(themeReducer, initialState);
	const [localTheme, setLocalTheme] = useLocalStorage("theme", "dark");
	const { mode } = state;

	const theme = React.useMemo(() => {
		const designTokens = getDesignTokens(mode);
		return createTheme(designTokens);
	}, [mode]);

	const toggleMode = () => {
		const newMode = mode === "light" ? "dark" : "light";
		setLocalTheme(newMode);
		dispatch({ type: "TOGGLE_MODE", payload: newMode });
	};

	React.useEffect(() => {
		const initializeTheme = () => {
			if (localTheme) {
				dispatch({ type: "TOGGLE_MODE", payload: localTheme });
			} else {
				const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
				const mode = prefersDarkMode ? "dark" : "light";
				dispatch({ type: "TOGGLE_MODE", payload: mode });
			}
		};

		initializeTheme();
	}, [localTheme]);

	return (
		<ThemeContext.Provider value={{ state, toggleMode }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	);
};

const useThemeContext = () => {
	const context = React.useContext(ThemeContext);
	if (!context) {
		throw new Error("useThemeContext must be used within a ThemeProvider");
	}
	return context;
};

export { ThemeProviderContext, useThemeContext };
