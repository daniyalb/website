'use client'
/** @jsxImportSource @emotion/react */
import './App.scss';

import React, { Suspense, useEffect, useMemo } from 'react';

import {
	createTheme,
	CssBaseline,
	LinearProgress,
	Skeleton,
	ThemeProvider,
	useMediaQuery,
} from '@mui/material';

import {
	ErrorBoundary,
	Footer,
	Navbar,
} from '../components';
import { GoogleTheme, THEME } from "./theme";

import TagManager from 'react-gtm-module';

// export const metadata = {
//  title: {
//      template: "GDSC UTM - %s",
//      default: "GDSC UTM",
//  },
//  description: "GDSC is a student-led community backed by Google Developers aimed at empowering undergraduate students from all disciplines to grow their knowledge in technology, build solutions for their local communities, and connect with other members from the Google community.",
// }

// TODO add skip to content button
export default function RootLayout({
	children,
}) {
	const systemTheme = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = useMemo(
		() =>
			createTheme(GoogleTheme({
				mode: systemTheme ? THEME.DARK : THEME.LIGHT,
			})),
		[systemTheme],
	);

	useEffect(() => {
		const tagManagerArgs = { gtmId: process.env.NEXT_PUBLIC_GTM_ID }

		TagManager.initialize(tagManagerArgs)
	}, [])

	return (
		<html lang="en">
			<body>
				<ThemeProvider theme={theme}>
					<CssBaseline enableColorScheme />
					<Navbar pages="pages" />
					<ErrorBoundary fallback={<div></div>} my="25vh">
						<Suspense fallback={
							<div css={{ height: "100vh" }}>
								<LinearProgress title="Page loading" />
								<div className="hero-header-parallax">
									<Skeleton variant="rectangular" animation="wave" height="30rem" />
								</div>
							</div>
						}>
							{children}
						</Suspense>
					</ErrorBoundary>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
