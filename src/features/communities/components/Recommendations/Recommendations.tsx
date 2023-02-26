import { CommunityLogo } from "@/components/CommunityLogo";
import { selectUserStateUser } from "@/features/auth/authSlice";
import { selectCommunitySnippetsState } from "@/features/communities/communitySlice";
import RecommendationsLoader from "@/features/communities/components/Recommendations/RecommendationsLoader";
import { useJoinCommunity } from "@/features/communities/hooks/useJoinCommunity";
import { useLeaveCommunity } from "@/features/communities/hooks/useLeaveCommunity";
import { Community } from "@/features/communities/types";
import { firestore } from "@/firebase/clientApp";
import { Box, Button, createStyles, Group, Paper, Text } from "@mantine/core";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import Link from "next/link";
import { andThen, ifElse, pipe } from "ramda";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const communitiesQuery = () =>
  query(
    collection(firestore, "communities"),
    orderBy("membersCount", "desc"),
    limit(5),
  );

const fetchTopCommunities = pipe(communitiesQuery, getDocs);

const formatCommunities = (querySnapshot: QuerySnapshot) =>
  querySnapshot.docs.map(
    (doc: any) => ({ id: doc.id, ...doc.data() } as Community),
  );

const useStyles = createStyles((theme) => ({
  header: {
    padding: theme.spacing.xs,
    height: 70,
    alignItems: "flex-end",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.white,
    fontWeight: 700,
    backgroundSize: "cover",
    backgroundImage:
      "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.75)), url(/images/recCommsArt.png)",
  },
  item: {
    padding: "10px 12px",
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    borderBottom: `1px solid ${theme.colors.gray[2]}`,
    // theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
    // theme.colorScheme === "dark" ? theme.colors.dark[6] : "white",
    fontSize: "10pt",
  },
  link: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.dark[9],
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

type RecommendationsProps = {};

const Recommendations: FC<RecommendationsProps> = () => {
  const { classes } = useStyles();
  const user = useSelector(selectUserStateUser);
  const { communitySnippetsIndexLookupById } = useSelector(
    selectCommunitySnippetsState,
  );

  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingJoinOrLeaveId, setLoadingJoinOrLeaveId] = useState<
    string | null
  >(null);

  const joinCommunity = useJoinCommunity();
  const leaveCommunity = useLeaveCommunity();

  const handleJoinOrLeaveCommunity = (
    isJoined: boolean,
    community: Community,
  ) => {
    if (!user) return;
    pipe(
      () => setLoadingJoinOrLeaveId(community.communityId),
      ifElse(
        () => isJoined,
        () => leaveCommunity(user, community),
        () => joinCommunity(user, community),
      ),
      andThen(() => setLoadingJoinOrLeaveId(null)),
    )();
  };

  const fetchCommunityRecommendations = () => {
    pipe(
      () => setIsLoading(true),
      fetchTopCommunities,
      andThen(pipe(formatCommunities, setCommunities)),
      andThen(() => setIsLoading(false)),
    )();
  };

  useEffect(() => {
    fetchCommunityRecommendations();
    return () => {};
  }, []);

  return (
    <Paper withBorder shadow="lg">
      <Group className={classes.header}>Top Communities</Group>
      {isLoading ? (
        <RecommendationsLoader />
      ) : (
        <>
          {communities.map((community, index) => {
            const isJoined =
              communitySnippetsIndexLookupById[community.communityId] !==
              undefined;
            const href = `/r/${community.communityId}`;
            const onClick = () =>
              handleJoinOrLeaveCommunity(isJoined, community);
            return (
              <Box key={community.communityId} className={classes.item}>
                <Text mr="xl" fw="bolder">
                  {index + 1}
                </Text>
                <Box component={Link} href={href} className={classes.link}>
                  <Group spacing="xs">
                    <CommunityLogo
                      imageUrl={community.imageUrl}
                      icon="FaReddit"
                      iconColor="lightblue"
                      width={24}
                      height={24}
                      fontSize={24}
                    />
                    <Text>{community.communityId}</Text>
                  </Group>
                </Box>
                <Button
                  h={22}
                  variant={isJoined ? "outline" : "filled"}
                  loaderPosition="center"
                  loading={loadingJoinOrLeaveId === community.communityId}
                  size="xs"
                  onClick={onClick}
                >
                  {isJoined ? "Leave" : "Join"}
                </Button>
              </Box>
            );
          })}
        </>
      )}
    </Paper>
  );
};
export default Recommendations;
