import { Flex } from "@radix-ui/themes";
import { TopBar } from "./components/top-bar";
import { useCallback, useEffect, useState } from "react";
import type { Ad } from "../../types/ad";
import { api } from "../../services/api";
import { AdCard } from "./components/ad-card";
import { AddAdDialog } from "./components/add-ad-dialog";

export const Dashboard = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  const handleDidMount = useCallback(async () => {
    const { data } = await api.get("/ad");
    setAds(data.ads);
  }, []);

  useEffect(() => {
    handleDidMount();
  }, [handleDidMount]);

  return (
    <Flex direction={"column"} gap="4">
      <TopBar />
      <Flex justify={"end"}>
        <AddAdDialog onSubmit={handleDidMount} />
      </Flex>
      <>
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
            onRemove={handleDidMount}
            onEdit={handleDidMount}
          />
        ))}
      </>
    </Flex>
  );
};
