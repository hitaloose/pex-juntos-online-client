import { Select } from "@radix-ui/themes";
import { CATEGORIES } from "../../utils/categories";
import { useMemo } from "react";

type Props = Select.RootProps & { showAllOption?: boolean };

export const CategorySelect = (props: Props) => {
  const { showAllOption, ...rest } = props;

  const options = useMemo(() => {
    if (showAllOption) {
      return [{ value: "all", label: "Todas" }, ...CATEGORIES];
    }

    return CATEGORIES;
  }, [showAllOption]);

  return (
    <Select.Root {...rest}>
      <Select.Trigger style={{ width: "100%" }} />
      <Select.Content>
        {options.map((category) => (
          <Select.Item key={category.value} value={category.value}>
            {category.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
