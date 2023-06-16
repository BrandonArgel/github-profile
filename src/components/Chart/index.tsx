import * as React from "react";
import ChartJS from "chart.js/auto";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { buildChartConfig } from "@utils";
import { Grid, Paper, Typography } from "@mui/material";

type ChartsProps = {
	data: any;
	config: any;
	title: string;
	size?: number;
};

const useStyles = makeStyles((theme: Theme) => ({
	paper: {
		backgroundColor: theme.palette.background.default,
		padding: "1rem",
	},
	title: {
		"&.MuiTypography-root": {
			color: theme.palette.text.primary,
			fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
			fontWeight: "bold",
			textAlign: "center",
		},
	},
	chart: {
		marginTop: "2rem",
		filter: theme.palette.mode === "dark" ? "brightness(1.25) saturate(1.25) contrast(1.25)" : "",
	},
	text: {},
	canvas: {},
}));

export const Chart: React.FC<ChartsProps> = ({ data, config, title, size = 350 }) => {
	const chartId = React.useId();
	const classes = useStyles();
	const chartError = !(data && data.length > 0);

	React.useEffect(() => {
		if (!data.length) return;
		const ctx = document.getElementById(chartId) as HTMLCanvasElement;
		const _config = {
			...config,
		};

		const chart = new ChartJS(ctx, buildChartConfig(_config));

		return () => {
			chart.destroy();
		};
	}, [data, config, chartId]);

	return (
		<Grid item xs={12} sm={6} md={4}>
			<Paper className={classes.paper}>
				<header>
					<Typography variant="h1" className={classes.title}>
						{title}
					</Typography>
				</header>
				<div className={classes.chart}>
					{chartError && <p className={classes.text}>Nothing to see here!</p>}
					<canvas id={chartId} width={size} height={size} className={classes.canvas} />
				</div>
			</Paper>
		</Grid>
	);
};
