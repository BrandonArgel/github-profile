import * as React from "react";
import GhPolyglot from "gh-polyglot";
import { Container, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Octokit } from "@octokit/core";
import { Charts, Repos, User, NotFound, RateLimit } from "@containers";
import { Header, Search, SEO, Spinner } from "@components";
import { BASE_URL } from "@constants";
import { LanguageModel, RateLimitUserModel, RepositoryModel, UserModel } from "@models";
import { errorMessages } from "@utils";
// import { mockLanguageData, mockUserData, mockRepoData } from "@utils";

const DEFAULT_USER = "octocat";

function App() {
	const { VITE_GITHUB_TOKEN } = import.meta.env;
	const octokit = new Octokit({ auth: VITE_GITHUB_TOKEN, baseUrl: BASE_URL });
	const theme = useTheme();
	const [inputUser, setInputUser] = React.useState<string>("");
	const [searchUser, setSearchUser] = React.useState<string>("");
	const [user, setUser] = React.useState<UserModel | null>(null);
	const [languages, setLanguages] = React.useState<LanguageModel[] | null>(null);
	const [repositories, setRepositories] = React.useState<RepositoryModel[]>([]);
	const [rateLimit, setRateLimit] = React.useState<RateLimitUserModel | null>(null);
	const [chartsRateLimit, setChartsRateLimit] = React.useState<RateLimitUserModel | null>(null);
	const [loading, setLoading] = React.useState<boolean>(true);
	const [httpCode, setHttpCode] = React.useState<keyof typeof errorMessages>(200);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (httpCode !== 200) setHttpCode(200);
		setInputUser(e.target.value);
	};

	const getUser = async () => {
		const { data } = await octokit.request("GET /users/{username}", {
			username: inputUser,
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
			},
		});

		setUser(data);
	};

	const getUserLanguages = async () => {
		const me = new GhPolyglot(`${inputUser}`);
		await me.userStats((_, stats: any) => {
			setLanguages(stats);
		});
	};

	const getUserRepositories = async () => {
		const { data } = await octokit.request("GET /users/{username}/repos?per_page=100", {
			username: inputUser,
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
			},
		});

		setRepositories(data);
	};

	const getRateLimit = async () => {
		const { data } = await octokit.request("GET /rate_limit", {
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
			},
		});

		const _rateLimit: RateLimitUserModel = {
			limit: data.rate.limit,
			remaining: data.rate.remaining,
			reset: data.rate.reset,
		};

		setRateLimit(_rateLimit);
	};

	const getChartsRateLimit = async () => {
		await fetch("https://api.github.com/rate_limit")
			.then((res) => res.json())
			.then((data) => {
				const _rateChartsLimit: RateLimitUserModel = {
					limit: data.rate.limit,
					remaining: data.rate.remaining,
					reset: data.rate.reset,
				};

				setChartsRateLimit(_rateChartsLimit);
			});
	};

	const init = () => {
		const params = new URLSearchParams(window.location.search);
		const user = params.get("user");

		if (user) {
			setSearchUser(user);
			setInputUser(user);
		} else {
			setSearchUser(DEFAULT_USER);
			setInputUser(DEFAULT_USER);
		}
	};

	const setUserFromQueryParams = () => {
		const params = new URLSearchParams(window.location.search);
		params.set("user", inputUser);
		window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
	};

	const handleSearch = () => {
		if (!searchUser) return;
		setLoading(true);
		setHttpCode(200);
		setUserFromQueryParams();

		Promise.all([
			getUser(),
			getUserLanguages(),
			getUserRepositories(),
			getRateLimit(),
			getChartsRateLimit(),
		])
			.catch((err) => {
				if (err.status) {
					setHttpCode(err.status);
				} else {
					setHttpCode(500);
				}

				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});

		// setLanguages(mockLanguageData);
		// setUser(mockUserData);
		// setRepositories(mockRepoData);

		// setTimeout(() => {
		// 	setLoading(false);
		// }, 1000);
	};

	React.useEffect(() => {
		init();
	}, []);

	React.useEffect(() => {
		handleSearch();
	}, [searchUser]); // eslint-disable-line react-hooks/exhaustive-deps

	const error = httpCode !== 200;

	return (
		<Container
			maxWidth={false}
			sx={{
				backgroundColor: theme.palette.background.default,
				color: theme.palette.text.primary,
				minHeight: "100vh",
				padding: "2rem 0",
			}}
		>
			<SEO
				title={`${user?.name ? user.name : "Github"}'s Profile`}
				description="Find any Github user's profile."
			/>
			<Container>
				<Header />
				<Search
					value={inputUser}
					onClick={handleSearch}
					onChange={handleChange}
					placeHolder="Github User"
					error={error}
				/>
				<Paper
					sx={{
						backgroundColor: theme.palette.background.default,
						borderRadius: "1rem",
						padding: "2rem",
						marginTop: "2rem",
					}}
				>
					{loading && <Spinner />}
					{!loading && (
						<>
							{error && <NotFound type={httpCode} />}
							{!error && (
								<>
									{user && <User user={user} />}
									{rateLimit && (
										<RateLimit rateLimit={rateLimit} chartRateLimit={chartsRateLimit} />
									)}
									{languages && repositories && (
										<Charts languages={languages} repositories={repositories} />
									)}
								</>
							)}
						</>
					)}
				</Paper>
				{!loading && !error && repositories && <Repos repositories={repositories} />}
			</Container>
		</Container>
	);
}

export default App;
