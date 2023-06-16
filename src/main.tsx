import { HelmetProvider } from "react-helmet-async";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProviderContext } from "@context";
import { getGlobalStyles } from "@styles";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProviderContext>
			{getGlobalStyles()}
			<HelmetProvider>
				<App />
			</HelmetProvider>
		</ThemeProviderContext>
	</React.StrictMode>
);
