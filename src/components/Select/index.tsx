import * as React from "react";
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select as MUISelect,
	SelectChangeEvent,
} from "@mui/material";

type SelectProps = {
	label: string;
	options: string[];
	value: string;
	onChange: (value: any) => void;
};

export const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => {
	const selectId = `select-${label}`;

	const onSelect = (e: SelectChangeEvent) => {
		onChange(String(e.target.value));
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl variant="standard" fullWidth>
				<InputLabel variant="standard" htmlFor={selectId}>
					{label}
				</InputLabel>
				<MUISelect value={value} onChange={onSelect} inputProps={{ id: selectId }} label={label}>
					{options.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</MUISelect>
			</FormControl>
		</Box>
	);
};
