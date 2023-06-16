import * as React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
	"@keyframes atomSpinnerAnimation1": {
		"100%": {
			transform: "rotateZ(120deg) rotateX(66deg) rotateZ(360deg)",
		},
	},
	"@keyframes atomSpinnerAnimation2": {
		"100%": {
			transform: "rotateZ(240deg) rotateX(66deg) rotateZ(360deg)",
		},
	},
	"@keyframes atomSpinnerAnimation3": {
		"100%": {
			transform: "rotateZ(360deg) rotateX(66deg) rotateZ(360deg)",
		},
	},
	root: {
		display: "grid",
		gridTemplateColumns: "1fr",
		gridTemplateRows: "1fr",
		gap: "1rem",
		placeItems: "center center",
		margin: "2rem auto",
		width: "fit-content",
		userSelect: "none",
	},
	spinner: {
		height: "6rem",
		width: "6rem",
		overflow: "hidden",
	},
	spinner__text: {
		color: theme.palette.primary.main,
		fontSize: "1.5rem",
		fontWeight: "bold",
		textTransform: "uppercase",
		letterSpacing: "0.2rem",
		textAlign: "center",
	},
	spinner__inner: {
		position: "relative",
		display: "block",
		height: "100%",
		width: "100%",
	},
	spinner__line: {
		position: "absolute",
		width: "100%",
		height: "100%",
		borderRadius: "50%",
		borderLeftWidth: "calc(60px / 15)",
		borderTopWidth: "calc(60px / 30)",

		borderLeftColor: theme.palette.primary.main,
		borderLeftStyle: "solid",
		borderTopStyle: "solid",
		borderTopColor: "transparent",

		"&:nth-child(1)": {
			animation: "$atomSpinnerAnimation1 1s linear infinite",
			transform: "rotateZ(120deg) rotateX(66deg) rotateZ(0deg)",
		},
		"&:nth-child(2)": {
			animation: "$atomSpinnerAnimation2 1s linear infinite",
			transform: "rotateZ(240deg) rotateX(66deg) rotateZ(0deg)",
		},
		"&:nth-child(3)": {
			animation: "$atomSpinnerAnimation3 1s linear infinite",
			transform: "rotateZ(360deg) rotateX(66deg) rotateZ(0deg)",
		},
	},
	spinner__circle: {
		display: "block",
		position: "absolute",
		color: theme.palette.primary.main,
		fontSize: "calc(60px * 0.24)",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
}));

type SpinnerProps = {
	text?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ text = "Loading" }) => {
	const [dottedText, setDottedText] = React.useState(text);
	const classes = useStyles();

	React.useEffect(() => {
		const interval = setInterval(() => {
			setDottedText((prev) => {
				if (prev === text + "...") {
					return text;
				} else {
					return prev + ".";
				}
			});
		}, 500);
		return () => clearInterval(interval);
	}, [text]);

	return (
		<div className={classes.root}>
			<div className={classes.spinner}>
				<div className={classes.spinner__inner}>
					<div className={classes.spinner__line}></div>
					<div className={classes.spinner__line}></div>
					<div className={classes.spinner__line}></div>
					<div className={classes.spinner__circle}>&#9679;</div>
				</div>
			</div>
			<span className={classes.spinner__text}>{dottedText}</span>
		</div>
	);
};
