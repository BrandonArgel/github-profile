import * as React from "react";
import { CardMedia, Grid, Icon, Link, Paper, Stack, Typography } from "@mui/material";
import {
	Apartment,
	CalendarMonth,
	LocationOn,
	Language,
	Twitter,
	Email,
} from "@mui/icons-material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { UserModel } from "@models";

type UserProps = {
	user: UserModel;
};

const useStyles = makeStyles((theme: Theme) => ({
	avatarContainer: {
		"&.MuiGrid-item": {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
	},
	avatar: {
		aspectRatio: "1 / 1",
		borderRadius: "50%",
		border: `0.5rem solid ${theme.palette.primary.main}`,
		display: "block",
		height: "auto",
		width: "100%",
		maxWidth: "250px",
	},
	title: {
		"&.MuiTypography-root": {
			color: theme.palette.text.primary,
			fontSize: "clamp(1.8rem, 4vw, 3.6rem)",
			fontWeight: "bold",
		},
	},
	link: {
		"&.MuiTypography-root": {
			color: theme.palette.primary.main,
			fontSize: "clamp(1.5rem, 3vw, 3rem) !important",
			textDecoration: "auto",
		},
	},
	paper: {
		backgroundColor: theme.palette.background.default,
		padding: "1rem",
		textAlign: "center",
	},
	subtitle: {
		"&.MuiTypography-root": {
			fontWeight: "bold",
		},
	},
	number: {
		"&.MuiTypography-root": {
			marginTop: "0",
		},
	},
}));

export const User: React.FC<UserProps> = ({ user }): JSX.Element => {
	const {
		avatar_url,
		bio,
		blog,
		company,
		created_at,
		email,
		followers,
		following,
		html_url,
		location,
		login,
		name,
		public_gists,
		public_repos,
		twitter_username,
	} = user;
	console.log({public_gists})
	const classes = useStyles();

	return (
		<Grid container rowSpacing={3} columnSpacing={{ xs: 2, sm: 3 }}>
			<Grid item xs={12} sm={3} className={classes.avatarContainer}>
				{avatar_url && (
					<CardMedia
						component="img"
						image={avatar_url}
						alt={name ?? login ?? undefined}
						className={classes.avatar}
						width={200}
						height={200}
					/>
				)}
			</Grid>
			<Grid item xs={12} sm={9}>
				<Stack spacing={1}>
					{name && (
						<Typography variant="h2" className={classes.title}>
							{name}
						</Typography>
					)}
					{login && (
						<Link href={html_url ?? undefined} target="_blank" className={classes.link}>
							@{login}
						</Link>
					)}
				</Stack>
			</Grid>
			{bio && (
				<Grid item xs={12}>
					<Typography variant="body1">{bio}</Typography>
				</Grid>
			)}
			<Grid item xs={12}>
				<Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
					<Grid item xs={6} sm={3}>
						<Paper className={classes.paper}>
							<Stack spacing={1} direction="column">
								<Typography variant="body1" className={classes.subtitle}>
									Repositories
								</Typography>
								<Typography variant="body1" className={classes.number}>
									{public_repos}
								</Typography>
							</Stack>
						</Paper>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Paper className={classes.paper}>
							<Stack spacing={1} direction="column">
								<Typography variant="body1" className={classes.subtitle}>
									Followers
								</Typography>
								<Typography variant="body1" className={classes.number}>
									{followers!.toLocaleString()}
								</Typography>
							</Stack>
						</Paper>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Paper className={classes.paper}>
							<Stack spacing={1} direction="column">
								<Typography variant="body1" className={classes.subtitle}>
									Following
								</Typography>
								<Typography variant="body1" className={classes.number}>
									{following!.toLocaleString()}
								</Typography>
							</Stack>
						</Paper>
					</Grid>
					<Grid item xs={6} sm={3}>
						<Paper className={classes.paper}>
							<Stack spacing={1} direction="column">
								<Typography variant="body1" className={classes.subtitle}>
									Gists
								</Typography>
								<Typography variant="body1" className={classes.number}>
									{public_gists!.toLocaleString() ?? 0}
								</Typography>
							</Stack>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Stack spacing={1} direction="row" alignItems="center">
							<Icon color="primary">
								<Apartment />
							</Icon>
							<Typography variant="body1">
								<strong>Company: </strong>
								{company ?? "not available."}
							</Typography>
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Stack spacing={1} direction="row" alignItems="center">
							<Icon color="primary">
								<LocationOn />
							</Icon>
							<Typography variant="body1">
								<strong>Location: </strong>
								{location ?? "not available."}
							</Typography>
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Stack spacing={1} direction="row" alignItems="center">
							<Icon color="primary">
								<Language />
							</Icon>
							<Typography
								variant="body1"
								sx={{
									display: "inline-flex",
									gap: "0.5rem",
									overflow: "hidden",
								}}
							>
								<strong>Website: </strong>
								{blog ? (
									<Link
										href={blog}
										target="_blank"
										sx={{
											textOverflow: "ellipsis",
											overflow: "hidden",
										}}
									>
										{/* Regular expression to remove https:// and http:// from an URL*/}
										{blog.replace(/(^\w+:|^)\/\//, "")}
									</Link>
								) : (
									"not available."
								)}
							</Typography>
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Stack spacing={1} direction="row" alignItems="center">
							<Icon color="primary">
								<Twitter />
							</Icon>
							<Typography variant="body1">
								<strong>Twitter: </strong>
								{twitter_username ? (
									<Link href={`https://twitter.com/${twitter_username}`} target="_blank">
										@{twitter_username}
									</Link>
								) : (
									"not available."
								)}
							</Typography>
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Stack spacing={1} direction="row" alignItems="center">
							<Icon color="primary">
								<Email />
							</Icon>
							<Typography variant="body1">
								<strong>Email: </strong>
								{email ? (
									<Link href={`mailto:${email}`} target="_blank">
										{email}
									</Link>
								) : (
									"not available."
								)}
							</Typography>
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Stack spacing={1} direction="row" alignItems="center">
							<Icon color="primary">
								<CalendarMonth />
							</Icon>
							<Typography variant="body1">
								<strong>Joined: </strong>
								{created_at ? (
									<>
										{new Date(created_at).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</>
								) : (
									"not available."
								)}
							</Typography>
						</Stack>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
