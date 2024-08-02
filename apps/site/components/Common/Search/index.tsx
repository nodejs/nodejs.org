"use client";

import type { FC } from "react";
import type {
	RegisterSearchBoxProps,
	RegisterSearchButtonProps,
} from "@orama/searchbox";
import { useTheme } from "next-themes";
import { SearchBox, SearchButton as OramaSearchButton } from "@orama/searchbox";
import { OramaClient } from "@oramacloud/client";
import "@orama/searchbox/dist/index.css";

import {
	ORAMA_CLOUD_ENDPOINT,
	ORAMA_CLOUD_API_KEY,
} from "@/next.constants.mjs";

const oramaClient = new OramaClient({
	endpoint: ORAMA_CLOUD_ENDPOINT,
	api_key: ORAMA_CLOUD_API_KEY,
});

export const SearchButton: FC = () => {
	const { resolvedTheme } = useTheme();

	const searchBoxProps: RegisterSearchBoxProps = {
		// @ts-ignore - This is a bug in the searchbox types
		oramaInstance: oramaClient,
		colorScheme: resolvedTheme,
		backdrop: true,
		resultsMap: {
			title: "pageSectionTitle",
			description: "pageSectionContent",
		},
		facetProperty: "siteSection",
		themeConfig: {
			dark: {
				"--text-color-accent": "#84ba64",
			},
			light: {
				"--text-color-accent": "#84ba64",
			},
		},
		seeAllLink: {
			url: "/search",
			label: (count: string, term?: string | undefined) =>
				`See all ${count} results for ${term}`,
		},
	};

	const searchButtonProps: RegisterSearchButtonProps = {
		colorScheme: resolvedTheme,
		themeConfig: {
			dark: {
				"--search-btn-border-color-hover": "#417e384d",
			},
			light: {
				"--search-btn-border-color-hover": "#417e384d",
			},
		},
	};

	return (
		<>
			<OramaSearchButton {...searchButtonProps} />
			<SearchBox {...searchBoxProps} />
		</>
	);
};
