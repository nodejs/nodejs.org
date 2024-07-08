"use client";

import type { FC } from "react";
import type {
	RegisterSearchBoxProps,
	RegisterSearchButtonProps,
} from "@orama/searchbox";
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

const searchBoxProps: RegisterSearchBoxProps = {
	oramaInstance: oramaClient,
	colorScheme: "dark",
	backdrop: true,
	resultsMap: {
		title: "pageSectionTitle",
		description: "pageSectionContent",
	},
};

const searchButtonProps: RegisterSearchButtonProps = {
	colorScheme: "dark",
};

export const SearchButton: FC = () => {
	return (
		<>
			<OramaSearchButton {...searchButtonProps} />
			<SearchBox {...searchBoxProps} />
		</>
	);
};
