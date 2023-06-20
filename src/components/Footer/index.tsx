import { useTheme } from "@mui/material/styles";
import { Email, Instagram, GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import { Platzi, Portfolio } from "@assets/icons/social.tsx";
import { Box, Link, Typography } from "@mui/material";

export const Footer = () => {
	const theme = useTheme();

	const social = [
		{
			link: "https://github.com/BrandonArgel",
			icon: <GitHub />,
			title: "Brandon Argel's GitHub",
		},
		{
			link: "https://www.instagram.com/brandargel/",
			icon: <Instagram />,
			title: "Brandon Argel's Instagram",
		},
		{
			link: "https://www.linkedin.com/in/brandargel/",
			icon: <LinkedIn />,
			title: "Brandon Argel's LinkedIn",
		},
		{
			link: "https://twitter.com/BrandArgel",
			icon: <Twitter />,
			title: "Brandon Argel's Twitter",
		},
		{
			link: "mailto:brandargel@gmail.com",
			icon: <Email />,
			title: "Brandon Argel's Email",
		},
		{
			link: "https://platzi.com/p/BrandArgel/",
			icon: <Platzi color={theme.palette.primary.main} />,
			title: "Brandon Argel's Platzi Profile",
		},
		{
			link: "https://brandonargel.me",
			icon: <Portfolio color={theme.palette.primary.main} />,
			title: "Brandon Argel's Portfolio",
		},
	];

	return (
		<footer
			style={{
				width: "100%",
			}}
		>
			<Box
				sx={{
					alignItems: "center",
					display: "flex",
					flexFlow: "row wrap",
					gap: "1rem",
					justifyContent: "space-around",
					padding: "2rem",
					maxWidth: "800rem",
					width: "100%",
				}}
			>
				<Box
					sx={{
						textAlign: "center",
						width: "30rem",
					}}
				>
					<Typography
						variant="body2"
						sx={{
							whiteSpace: "nowrap",
						}}
					>
						Project created with the{" "}
						<Link
							underline="hover"
							target="_blank"
							rel="noopener noreferrer"
							href={"https://docs.github.com/en/rest?apiVersion=2022-11-28"}
						>
							GitHub API
						</Link>{" "}
						and{" "}
						<Link
							underline="hover"
							target="_blank"
							rel="noopener noreferrer"
							href="https://platzi.com/"
						>
							Platzi
						</Link>
						. 💚
					</Typography>
					<Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
						Made by Brandon Argel. 🧑‍💻
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						gap: "1rem",
						width: "30rem",
						justifyContent: "center",
					}}
				>
					{social.map(({ link, icon, title }) => (
						<Link
							key={title}
							href={link}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={title}
							sx={{
								color: theme.palette.primary.main,
								transition: "all .2s ease-in-out",
								willChange: "transform",

								"& svg": {
									width: "3rem",
									height: "3rem",
									borderRadius: "50%",
								},

								"&:hover": {
									transform: "scale(1.2)",
								},
							}}
						>
							{icon}
						</Link>
					))}
				</Box>
			</Box>
		</footer>
	);
};
