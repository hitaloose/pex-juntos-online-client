import { Card, Flex, Text } from "@radix-ui/themes";
import { TopBar } from "./components/top-bar";
import { useCallback, useEffect, useState } from "react";
import type { Ad } from "../../types/ad";
import { api } from "../../services/api";
import { AdCard } from "./components/ad-card";
import { AddAdDialog } from "./components/add-ad-dialog";
import { errorHandler } from "../../utils/error";

export const Dashboard = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  const [loading, setLoading] = useState(false);

  const handleDidMount = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await api.get("/ad");
      setAds(data.ads);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
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
        {loading && (
          <Card>
            <Flex justify={"center"} align={"center"}>
              <Text>Carregando...</Text>
            </Flex>
          </Card>
        )}
        {!loading &&
          ads.map((ad) => (
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
