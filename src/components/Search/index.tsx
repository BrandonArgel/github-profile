import * as React from "react";
import { Button, Stack, TextField, IconButton } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";

type SearchProps = {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClick: () => void;
	placeHolder?: string;
	error?: string;
};

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "4rem",
	},
	textField: {
		borderRadius: "0.5rem",
		padding: "0",
		height: "100%",

		"& .MuiOutlinedInput-root": {
			borderRadius: "1.5rem",
			height: "100%",
		},

		"&:focus-within .MuiButtonBase-root": {
			color: theme.palette.primary.main,

			"&:disabled": {
				opacity: "0.5",
			},
		},
		// Error change button color
		"& .MuiOutlinedInput-root.Mui-error .MuiButtonBase-root": {
			color: theme.palette.error.main,
		},

		// "& .MuiOutlinedInput-notchedOutline": {
		// 	borderColor: theme.palette.primary.main,
		// },
	},
	button: {
		"&.MuiButtonBase-root": {
			alignItems: "center",
			borderRadius: "1.5rem",
			background: `linear-gradient(150deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,

			"&:hover": {
				background: `linear-gradient(150deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
			},
			"&:disabled": {
				background: `linear-gradient(150deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
				color: theme.palette.text.primary,
				opacity: "0.5",
			},
		},
	},
}));

export const Search: React.FC<SearchProps> = ({
	value,
	onChange,
	onClick,
	placeHolder,
	error = "",
}) => {
	const classes = useStyles();

	return (
		<Stack direction="row" spacing={2} className={classes.root}>
			<TextField
				autoFocus
				className={classes.textField}
				label={placeHolder}
				fullWidth
				variant="outlined"
				value={value}
				onChange={onChange}
				error={Boolean(error)}
				InputProps={{
					endAdornment: (
						<IconButton disabled={!value} onClick={onClick}>
							<SearchIcon />
						</IconButton>
					),
				}}
			/>
			<Button
				className={classes.button}
				variant="contained"
				color="primary"
				onClick={onClick}
				disabled={!value}
				title="Search"
			>
				Search
			</Button>
		</Stack>
	);
};
