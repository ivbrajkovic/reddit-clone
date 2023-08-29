import { Group, Radio, Text } from "@mantine/core";
import { ComponentProps, FC } from "react";
import { IconType } from "react-icons/lib";

type RadioWithIconProps = ComponentProps<typeof Radio> & { Icon: IconType };
const RadioButtonWithIcon: FC<RadioWithIconProps> = ({
  label,
  Icon,
  ...props
}) => (
  <Radio
    size="sm"
    label={
      <Group spacing="xs">
        <Icon fontSize={18} color="#868e96" />
        <Text fw={500}>{label}</Text>
      </Group>
    }
    styles={{
      inner: {
        alignSelf: "center",
      },
      labelWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      description: {
        marginTop: 0,
        paddingLeft: 4,
      },
    }}
    {...props}
  />
);

export default RadioButtonWithIcon;
