import { Tab } from "@/features/posts/types";
import { Tabs } from "@mantine/core";
import { FC } from "react";
import {
  BsFileText,
  BsFillFileTextFill,
  BsFillMicFill,
  BsListOl,
} from "react-icons/bs";
import { IoImage, IoImageOutline } from "react-icons/io5";
import { TfiLink } from "react-icons/tfi";

type TabListProps = { activeTab: Tab };

const TabList: FC<TabListProps> = ({ activeTab }) => {
  return (
    <Tabs.List grow>
      <Tabs.Tab
        value={Tab.Post}
        icon={activeTab === Tab.Post ? <BsFillFileTextFill /> : <BsFileText />}
      >
        Post
      </Tabs.Tab>
      <Tabs.Tab
        value={Tab.ImageAndVideo}
        icon={
          activeTab === Tab.ImageAndVideo ? <IoImage /> : <IoImageOutline />
        }
      >
        Image & Video
      </Tabs.Tab>
      <Tabs.Tab value={Tab.Link} icon={<TfiLink fontSize={22} />}>
        Link
      </Tabs.Tab>
      <Tabs.Tab disabled value={Tab.Poll} icon={<BsListOl />}>
        Poll
      </Tabs.Tab>
      <Tabs.Tab disabled value={Tab.Talk} icon={<BsFillMicFill />}>
        Talk
      </Tabs.Tab>
    </Tabs.List>
  );
};
export default TabList;
