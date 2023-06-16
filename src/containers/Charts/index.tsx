import * as React from "react";
import { Chart } from "@components";
import { languageColors, backgroundColor, borderColor } from "@utils";
import { LanguageModel, RepositoryModel } from "@models";
import { Grid } from "@mui/material";

type ChartsProps = {
	languages: LanguageModel[];
	repositories: RepositoryModel[];
};

export const Charts: React.FC<ChartsProps> = ({ languages, repositories }) => {
	// Chart data
	const [languageData, setLanguageData] = React.useState<number[]>([]);
	const [starsData, setStarsData] = React.useState<number[]>([]);
	const [starsPerLangData, setStarsPerLangData] = React.useState<number[]>([]);
	const [languageConfig, setLanguageConfig] = React.useState<any>({});
	const [starsConfig, setStarsConfig] = React.useState<any>({});
	const [starsPerLangConfig, setStarsPerLangConfig] = React.useState<any>({});

	React.useEffect(() => {
		if (!languages.length && !repositories.length) return;
		// Create Top Languages chart
		const initLangChart = () => {
			const labels = languages && languages.map((lang) => lang.label);
			const data = languages && languages.map((lang) => lang.value);

			setLanguageData(data);

			if (data!.length > 0) {
				const backgroundColor =
					languages &&
					languages.map(
						({ color }) => `#${color.length > 4 ? color.slice(1) : color.slice(1).repeat(2)}B3`
					);
				const borderColor = languages && languages.map((lang) => `${lang.color}`);
				const chartType = "pie";
				const axes = false;
				const legend = true;
				const config = { chartType, labels, data, backgroundColor, borderColor, axes, legend };

				setLanguageConfig(config);
			}
		};

		const initStarChart = () => {
			const LIMIT = 5;
			const mostStarredRepos = repositories
				.filter((repo) => !repo.fork)
				.sort((a, b) => b.stargazers_count! - a.stargazers_count!)
				.slice(0, LIMIT);
			const labels = mostStarredRepos.map((repo) => repo.name);
			const data = mostStarredRepos.map((repo) => repo.stargazers_count!);

			setStarsData(data);

			if (data.length > 0) {
				const chartType = "bar";
				const axes = true;
				const legend = false;
				const config = { chartType, labels, data, backgroundColor, borderColor, axes, legend };

				setStarsConfig(config);
			}
		};

		// Create Stars per language chart
		const initStarsPerLangChart = () => {
			const filteredRepos = repositories.filter((repo) => !repo.fork && repo.stargazers_count! > 0);
			const uniqueLangs = new Set(filteredRepos.map((repo) => repo.language));
			const labels = Array.from(uniqueLangs.values()).filter((l) => l);
			const data = labels.map((lang) => {
				const repos = filteredRepos.filter((repo) => repo.language === lang);
				const starsSum = repos.reduce((a, b) => a + b.stargazers_count!, 0);
				return starsSum;
			});

			setStarsPerLangData(data);

			if (data.length > 0) {
				const chartType = "doughnut";
				const axes = false;
				const legend = true;
				const borderColor = labels.map(
					(label) => languageColors[label as keyof typeof languageColors]
				);
				const backgroundColor = borderColor.map((color) => `${color}B3`);
				const config = { chartType, labels, data, backgroundColor, borderColor, axes, legend };

				setStarsPerLangConfig(config);
			}
		};

		initLangChart();
		initStarChart();
		initStarsPerLangChart();
	}, [languages, repositories]);

	return (
		<Grid container rowSpacing={3} columnSpacing={{ xs: 2, sm: 3 }} sx={{
			marginTop: 2,
		}}>
			<Chart title={"Top Languages"} data={languageData} config={languageConfig} />
			<Chart title={"Most Starred"} data={starsData} config={starsConfig} />
			<Chart title={"Stars per Language"} data={starsPerLangData} config={starsPerLangConfig} />
		</Grid>
	);
};
