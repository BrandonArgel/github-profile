import { GlobalStyles } from "@mui/material";

export const getGlobalStyles = () => {
	return (
		<GlobalStyles
			styles={{
				"*": {
					margin: 0,
					padding: 0,
					boxSizing: "border-box",
				},
				html: {
					scrollBehavior: "smooth",
					fontSize: "62.5%",
				},
				body: {
					fontFamily: "Roboto, sans-serif",
				},
			}}
		/>
	);
};
