import * as React from "react";
import GhPolyglot from "gh-polyglot";
import { Container, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Octokit } from "@octokit/core";
import { Charts, UserCard } from "@containers";
import { Header, Search, SEO, Spinner } from "@components";
import { BASE_URL } from "@constants";
import { LanguageModel, UserModel, RepositoryModel } from "@models";
import { mockLanguageData, mockUserData, mockRepoData } from "@utils";

/**
 * TODO:
 * 1. Implement user card. ✅
 * 2. Create context for theme. ✅
 * 3. Implement charts.
 * 3.1 Create chart component.
 * 4. Implement repositories list.
 * 5. Implement user profile.
 **/

function App() {
	const { VITE_GITHUB_TOKEN } = import.meta.env;
	const octokit = new Octokit({ auth: VITE_GITHUB_TOKEN, baseUrl: BASE_URL });
	const theme = useTheme();
	const [inputUser, setInputUser] = React.useState<string>("octocat");
	const [user, setUser] = React.useState<UserModel | null>(null);
	const [languages, setLanguages] = React.useState<LanguageModel[] | null>(null);
	const [repositories, setRepositories] = React.useState<RepositoryModel[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState({ message: "", type: 200 });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (error.message) setError({ message: "", type: 200 });
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
		await me.userStats((err: any, stats: any) => {
			if (err) {
				setError({ message: err.message, type: 500 });
			}

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

	const handleSearch = () => {
		setLoading(true);

		// Promise.all([getUser(), getUserLanguages(), getUserRepositories()]).finally(() => {
		// 	setLoading(false);
		// });

		setLanguages(mockLanguageData);
		setUser(mockUserData);
		setRepositories(mockRepoData);

		setTimeout(() => {
			setLoading(false);
		}, 1000);
	};

	React.useEffect(() => {
		handleSearch();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Container
			maxWidth={false}
			sx={{
				backgroundColor: theme.palette.background.default,
				color: theme.palette.text.primary,
				minHeight: "100vh",
				padding: "2rem",
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
					error={error.message}
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
					{!loading && error && <p style={{ color: theme.palette.error.main }}>{error.message}</p>}
					{!loading && user && <UserCard user={user} />}
					{!loading && languages && repositories && (
						<Charts languages={languages} repositories={repositories} />
					)}
				</Paper>
			</Container>
		</Container>
	);
}

export default App;
