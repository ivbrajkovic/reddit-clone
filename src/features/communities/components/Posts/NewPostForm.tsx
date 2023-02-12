import ImageAndVideoPanel from "@/features/communities/components/Posts/components/ImageAndVideoPanel";
import LinkPanel from "@/features/communities/components/Posts/components/LinkPanel";
import PostPanel from "@/features/communities/components/Posts/components/PostPanel";
import { createStyles, Paper, Tabs } from "@mantine/core";
import { FC, useState } from "react";
import {
  BsFileText,
  BsFillFileTextFill,
  BsFillMicFill,
  BsListOl,
} from "react-icons/bs";
import { IoImage, IoImageOutline } from "react-icons/io5";
import { TfiLink } from "react-icons/tfi";

const useStyles = createStyles((theme) => ({
  tab: {
    padding: "15px 17px",
    color: theme.colors.gray[6],

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
  panel: {
    padding: 16,
  },
}));

type NewPostFormProps = {};

enum Tab {
  Post = "Post",
  ImageAndVideo = "Image & Video",
  Link = "Link",
  Poll = "Poll",
  Talk = "Talk",
}

const tabs = [
  
]

const NewPostForm: FC<NewPostFormProps> = () => {
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState<string | null>(Tab.Post);
  return (
    <Paper withBorder shadow="sm">
      <Tabs value={activeTab} onTabChange={setActiveTab} classNames={classes}>
        <Tabs.List grow>
          <Tabs.Tab
            value={Tab.Post}
            icon={
              activeTab === Tab.Post ? <BsFillFileTextFill /> : <BsFileText />
            }
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

        <Tabs.Panel value={Tab.Post}>
          <PostPanel />
        </Tabs.Panel>
        <Tabs.Panel value={Tab.ImageAndVideo}>
          <ImageAndVideoPanel />
        </Tabs.Panel>
        <Tabs.Panel value={Tab.Link}>
          <LinkPanel />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};
export default NewPostForm;
