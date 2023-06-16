import * as React from "react";
import { Helmet } from "react-helmet-async";

type SEOProps = {
	title: string;
	description: string;
};

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
	return (
		<Helmet
			title={title}
			htmlAttributes={{ lang: "en" }}
			meta={[
				{
					name: `description`,
					content: description,
				},
			]}
		/>
	);
};
