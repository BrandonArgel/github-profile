import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { errorMessages } from "@utils";

export type NotFoundProps = {
	type: keyof typeof errorMessages;
};

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
	title: {
		"&.MuiTypography-root": {
			fontSize: "clamp(1.8rem, 2.5vw, 2.5rem)",
      textAlign: "center",

			"& span": {
				color: theme.palette.error.main,
			},
		},
	},
}));

export const NotFound: React.FC<NotFoundProps> = ({ type }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant="h2" className={classes.title}>
				<span>Error: {type}</span> {errorMessages[type]}
			</Typography>
		</div>
	);
};
