import { Select } from "@radix-ui/themes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../../services/api";

type Props = Select.RootProps & { showAllOption?: boolean };

export const NeighborhoodSelect = (props: Props) => {
  const { showAllOption, ...rest } = props;

  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);

  const options = useMemo(() => {
    if (showAllOption) {
      return ["Todos", ...neighborhoods];
    }

    return neighborhoods;
  }, [neighborhoods, showAllOption]);

  const handleDidMount = useCallback(async () => {
    const { data } = await api.get("/neighborhood");
    setNeighborhoods(data.neighborhoods);
  }, []);

  useEffect(() => {
    handleDidMount();
  }, [handleDidMount]);

  return (
    <Select.Root {...rest}>
      <Select.Trigger style={{ width: "100%" }} />
      <Select.Content>
        {options.map((option) => (
          <Select.Item key={option} value={option}>
            {option}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
