import { createStyles, Paper, Tabs } from "@mantine/core";
import { FC, useState } from "react";
import {
  BsFileText,
  BsFillFileTextFill,
  BsFillMicFill,
  BsListOl,
  BsMic,
} from "react-icons/bs";
import { IoImage, IoImageOutline } from "react-icons/io5";
import { TfiLink } from "react-icons/tfi";

const useStyles = createStyles((theme) => ({
  tab: {
    padding: "15px 17px",
    color: theme.colors.gray[6],

    // display: "flex",
    // alignContent: "center",

    "&[data-active='true']": {
      color: theme.colors.blue[7],
    },
  },
  tabLabel: {
    fontWeight: 600,
    fontSize: 14,
  },
  tabIcon: {
    fontSize: 22,
  },
}));

type NewPostFormProps = {};

const NewPostForm: FC<NewPostFormProps> = () => {
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState<string | null>("1");
  return (
    <Paper withBorder shadow="sm">
      <Tabs value={activeTab} onTabChange={setActiveTab} classNames={classes}>
        <Tabs.List grow>
          <Tabs.Tab
            value="1"
            icon={activeTab === "1" ? <BsFillFileTextFill /> : <BsFileText />}
          >
            Post
          </Tabs.Tab>
          <Tabs.Tab
            value="2"
            icon={activeTab === "2" ? <IoImage /> : <IoImageOutline />}
          >
            Image & Video
          </Tabs.Tab>
          <Tabs.Tab value="3" icon={<TfiLink fontSize={22} />}>
            Link
          </Tabs.Tab>
          <Tabs.Tab value="4" icon={<BsListOl />}>
            Poll
          </Tabs.Tab>
          <Tabs.Tab
            value="5"
            icon={activeTab === "5" ? <BsFillMicFill /> : <BsMic />}
          >
            Talk
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="1">1</Tabs.Panel>
        <Tabs.Panel value="2">2</Tabs.Panel>
        <Tabs.Panel value="3">3</Tabs.Panel>
        <Tabs.Panel value="4">4</Tabs.Panel>
        <Tabs.Panel value="5">5</Tabs.Panel>
      </Tabs>
    </Paper>
  );
};
export default NewPostForm;
