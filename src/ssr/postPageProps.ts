import { wrapper } from "@/store/store";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    return {
      props: {},
    };
  });
