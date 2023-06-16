import * as React from "react";
import { RepoIcon, StarIcon, RepoForkedIcon } from "@primer/octicons-react";
import FlipMove from "react-flip-move";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Pagination } from "@mui/material";
import { Select } from "@components";
import { languageColors } from "@utils";
import { RepositoryModel, SortType } from "@models";
import { Link, Paper, Typography } from "@mui/material";

const LIMIT = 12;
const sortTypes: SortType[] = ["stars", "forks", "size"];
const sortProperties: { [key in SortType]: keyof RepositoryModel } = {
	stars: "stargazers_count",
	forks: "forks_count",
	size: "size",
};

type RepoProps = {
	repositories: RepositoryModel[];
};

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		marginTop: theme.spacing(4),
	},
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: theme.spacing(2),
	},
	title: {
		"&.MuiTypography-root": {
			fontSize: "clamp(2rem, 2.5vw, 3rem)",
		},
	},
	repos: {
		"& ul": {
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
			gridGap: theme.spacing(2),
			listStyle: "none",
		},
	},
	repo: {
		borderRadius: "1.5rem",
		boxShadow: theme.shadows[1],
		transition: "all 200ms cubic-bezier(0.23, 1, 0.32, 1) 0s",

		"&:hover": {
			boxShadow: theme.shadows[4],
			filter: "brightness(1.1)",
			transform: "translateY(-3px)",
		},
	},
	paper: {
		padding: theme.spacing(2),
		height: "100%",
	},
	link: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		height: "100%",
	},
	repoHeader: {
		marginBottom: theme.spacing(1),
	},
	repoTop: {
		display: "flex",
		alignItems: "center",
		gap: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	repoTitle: {
		"&.MuiTypography-root": {
			fontSize: "clamp(1.6rem, 1.5vw, 2rem)",
			whiteSpace: "nowrap",
			textOverflow: "ellipsis",
			overflow: "hidden",
		},
	},
	repoDescription: {
		"&.MuiTypography-root": {
			fontSize: "clamp(1.4rem, 1.5vw, 1.8rem)",
			color: theme.palette.text.primary,
		},
	},
	repoStats: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		gap: theme.spacing(1),
		fontSize: "clamp(1.4rem, 1.5vw, 1.8rem)",
		color: theme.palette.text.primary,
	},
	repoStatsLeft: {
		display: "flex",
		alignItems: "center",
		gap: theme.spacing(1),
	},
	repoStatsRight: {
		whiteSpace: "nowrap",
	},
	repoText: {
		color: theme.palette.text.primary,
		display: "flex",
		alignItems: "center",
		gap: "0.3rem",

		"& span": {
			color: theme.palette.primary.main,
		},
	},
	languageColor: {
		width: "1.5rem",
		height: "1.5rem",
		borderRadius: "50%",
	},
	pagination: {
		marginTop: theme.spacing(2),
		display: "flex",
		justifyContent: "center",

		"& .MuiPaginationItem-root.Mui-selected": {
			color: theme.palette.common.black,
		},
	},
}));

export const Repos: React.FC<RepoProps> = ({ repositories }) => {
	const classes = useStyles();
	const [page, setPage] = React.useState(1);
	const [topRepos, setTopRepos] = React.useState<RepositoryModel[]>([]);
	const [sortType, setSortType] = React.useState<SortType>("stars");

	const getTopRepos = () => {
		const sortProperty = sortProperties[sortType];
		const sorted = repositories
			.sort((a, b) =>
				b[sortProperty]! === a[sortProperty]! ? 0 : b[sortProperty]! < a[sortProperty]! ? -1 : 1
			)
			.slice((page - 1) * LIMIT, page * LIMIT);

		setTopRepos(sorted);
	};

	React.useEffect(() => {
		if (repositories.length) {
			getTopRepos();
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	React.useEffect(() => getTopRepos(), [sortType, page]); // eslint-disable-line react-hooks/exhaustive-deps

	const changeRepoSort = (type: SortType) => {
		setPage(1);
		setSortType(type);
	};

	return (
		<div className={classes.root}>
			<header className={classes.header}>
				<Typography variant="h2" className={classes.title}>
					Top Repos
				</Typography>
				<Select label="Sort by" value={sortType} onChange={changeRepoSort} options={sortTypes} />
			</header>
			<div className={classes.repos}>
				{topRepos.length > 0 ? (
					<FlipMove typeName="ul">
						{topRepos.map(
							({ id, name, html_url, description, language, stargazers_count, forks, size }) => (
								<li key={id} className={classes.repo}>
									<Paper className={classes.paper}>
										<Link
											href={html_url}
											target="_blank"
											rel="noopener noreferrer"
											underline="none"
											className={classes.link}
										>
											<header className={classes.repoHeader}>
												<div className={classes.repoTop}>
													<RepoIcon />
													<Typography variant="h3" className={classes.repoTitle}>
														{name}
													</Typography>
												</div>
												<Typography variant="body1" className={classes.repoDescription}>
													{description ?? "This repository has no description."}
												</Typography>
											</header>
											<div className={classes.repoStats}>
												<div className={classes.repoStatsLeft}>
													{language && (
														<div className={classes.repoText}>
															<div
																className={classes.languageColor}
																style={{
																	backgroundColor:
																		languageColors[language as keyof typeof languageColors],
																}}
															/>
															{language}
														</div>
													)}
													<div className={classes.repoText}>
														<span>
															<StarIcon />
														</span>
														{stargazers_count!.toLocaleString()}
													</div>
													<div className={classes.repoText}>
														<span>
															<RepoForkedIcon />
														</span>
														{forks!.toLocaleString()}
													</div>
												</div>
												<div className={classes.repoStatsRight}>
													<span>{size!.toLocaleString()} KB</span>
												</div>
											</div>
										</Link>
									</Paper>
								</li>
							)
						)}
					</FlipMove>
				) : (
					<p>No available repositories!</p>
				)}
			</div>
			<Pagination
				color="primary"
				className={classes.pagination}
				count={Math.ceil(repositories.length / LIMIT)}
				defaultPage={page}
				page={page}
				onChange={(_, p) => setPage(p)}
			/>
		</div>
	);
};
