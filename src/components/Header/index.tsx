import * as React from "react";
import { styled, Theme } from "@mui/material/styles";
import { Box, FormGroup, FormControlLabel, Stack, Switch, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useThemeContext } from "@context";
import github from "@assets/images/github.png";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "end",
		marginBottom: "2rem",
		userSelect: "none",
	},
	logo: {
		width: "clamp(3rem, 6vw, 5rem)",
		height: "clamp(3rem, 6vw, 5rem)",
		display: "flex",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: "clamp(1.5rem, 5vw, 4rem) !important",
		lineHeight: "clamp(1.5rem, 5vw, 4rem) !important",
		fontWeight: "bold",
		color: theme.palette.text.primary,
		background: `-webkit-linear-gradient(80deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
		textWrap: "nowrap",
		"-webkit-background-clip": "text",
		"-webkit-text-fill-color": "transparent",
	},
	switch: {
		flexDirection: "row-reverse",
	},
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
	width: 62,
	height: 34,
	padding: 7,
	display: "flex",
	alignItems: "end",
	margin: "0 !important",

	"& .MuiSwitch-switchBase": {
		margin: 0,
		padding: 0,
		transform: "translateX(6px)",
		"&.Mui-checked": {
			color: "#fff",
			transform: "translateX(22px)",
			"& .MuiSwitch-thumb:before": {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					"#fff"
				)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
			},
			"& + .MuiSwitch-track": {
				opacity: 1,
				filter: "brightness(0.8)",
				background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
			},
		},
	},
	"& .MuiSwitch-thumb": {
		background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
		width: 32,
		height: 32,
		"&:before": {
			content: "''",
			position: "absolute",
			width: "100%",
			height: "100%",
			left: 0,
			top: 0,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
				"#fff"
			)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
		},
	},
	"& .MuiSwitch-track": {
		opacity: 1,
		filter: "brightness(0.8)",
		background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
		borderRadius: 20 / 2,
	},
}));

export const Header: React.FC = () => {
	const classes = useStyles();
	const {
		state: { mode },
		toggleMode,
	} = useThemeContext();

	return (
		<Stack direction="row" spacing={2} className={classes.root}>
			<Box className={classes.logo}>
				<Box
					className={classes.image}
					component="img"
					alt="The house from the offer."
					src={github}
				/>
				<Typography variant="h1" className={classes.title}>
					Github Profile
				</Typography>
			</Box>
			<FormGroup>
				<FormControlLabel
					className={classes.switch}
					control={<MaterialUISwitch sx={{ m: 1 }} checked={mode === "dark"} />}
					// label={mode.charAt(0).toUpperCase() + mode.slice(1)}
					label=""
					onChange={toggleMode}
					sx={{
						margin: 0,
					}}
				/>
			</FormGroup>
		</Stack>
	);
};
