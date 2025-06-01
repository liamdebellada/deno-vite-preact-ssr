import type { useQuery as TUseQuery } from "@tanstack/react-query" with { "resolution-mode": "require" };
import * as reactQuery from "@tanstack/react-query";

export const useQuery = reactQuery.useQuery as unknown as typeof TUseQuery;
