import { useCallback, useEffect, useState } from "react";
import { api } from "../../services/api";
import type { Ad } from "../../types/ad";
import { SearchBox } from "./components/search-box";
import { EmptySearchCard } from "./components/empty-search-card";
import { Flex } from "@radix-ui/themes";
import { AdCard } from "./components/ad-card";
import { useSearchParams } from "react-router";
import { errorHandler } from "../../utils/error";
import { LoadingCard } from "./components/loading-card";

export const Home = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const handleDidMount = useCallback(async () => {
    setLoading(true);

    try {
      const q = searchParams.get("q");
      let category = searchParams.get("category");
      let neighborhood = searchParams.get("neighborhood");

      if (category === "all") {
        category = null;
      }

      if (neighborhood === "Todos") {
        neighborhood = null;
      }

      const { data } = await api.get("/ad/search", {
        params: { q, category, neighborhood },
      });
      setAds(data.ads);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    handleDidMount();
  }, [handleDidMount]);

  return (
    <Flex direction={"column"} gap="4">
      <SearchBox />
      {loading && <LoadingCard />}
      {!loading && !ads.length && <EmptySearchCard />}
      <>{!loading && ads.map((ad) => <AdCard key={ad.id} ad={ad} />)}</>
    </Flex>
  );
};
