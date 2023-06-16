import * as React from "react";
import { RateLimitUserModel } from "@models";
import { Button, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Close, Info } from "@mui/icons-material";
type RateLimitProps = {
	rateLimit: RateLimitUserModel | null;
	chartRateLimit: RateLimitUserModel | null;
};

export const RateLimit: React.FC<RateLimitProps> = ({ rateLimit, chartRateLimit }) => {
	const { reset, remaining, limit } = rateLimit || {};
	const { reset: resetChart, remaining: remainingChart, limit: limitChart } = chartRateLimit || {};
	const theme = useTheme();
	const [show, setShow] = React.useState(true);

	// const formatTime = (time: number) => {
	// 	const date = new Date(time * 1000);
	// 	const hours = date.getHours();
	// 	const minutes = "0" + date.getMinutes();
	// 	const seconds = "0" + date.getSeconds();

	// 	return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
	// };

	if (!show) return null;

	return (
		<Paper
			elevation={3}
			sx={{
				position: "relative",
				padding: "1rem",
				marginTop: theme.spacing(3),
        width: "fit-content",
        marginLeft: "auto",
        marginRight: "auto",
			}}
		>
			<Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
				<Info sx={{ color: theme.palette.primary.main, marginRight: "0.5rem" }} />
				Rate limit: {remaining} / {limit} resets at{" "}
				{new Date(reset! * 1000 ?? 0).toLocaleTimeString()}
			</Typography>
			<Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
				<Info sx={{ color: theme.palette.primary.main, marginRight: "0.5rem" }} />
				Chart rate rimit: {remainingChart} / {limitChart} resets at{" "}
				{new Date(resetChart! * 1000 ?? 0).toLocaleTimeString()}
			</Typography>
			<Button
        onClick={() => setShow(false)}
        variant="contained"
				sx={{
					position: "absolute",
					right: "-0.5rem",
					top: "-0.5rem",
          borderRadius: "50%",
          maxHeight: "2rem",
          maxWidth: "2rem",
          minHeight: "2rem",
          minWidth: "2rem",
          padding: 0,
				}}
			>
				<Close 
          sx={{
            color: theme.palette.common.black,
            maxHeight: "1.5rem",
            maxWidth: "1.5rem",
          }}
        />
			</Button>
		</Paper>
	);
};
