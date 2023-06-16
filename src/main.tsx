import { HelmetProvider } from "react-helmet-async";
import ReactDOM from 'react-dom';
import { ThemeProviderContext } from "@context";
import { getGlobalStyles } from "@styles";
import App from "./App.tsx";

const rootNode = document.getElementById("root");
ReactDOM.render(
	<ThemeProviderContext>
		{getGlobalStyles()}
		<HelmetProvider>
			<App />
		</HelmetProvider>
	</ThemeProviderContext>,
	rootNode
);
