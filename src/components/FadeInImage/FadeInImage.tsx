import { Box, createStyles, Image, ImageProps, Skeleton } from "@mantine/core";
import { FC, ReactEventHandler, useReducer } from "react";

const useStyles = createStyles((theme) => ({
  image: {
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
    "&[data-fade-in='true']": {
      opacity: "1 !important",
    },
  },
  skeleton: {
    position: "absolute",
    inset: 0,
  },
}));

type FadeInImageProps = ImageProps & React.RefAttributes<HTMLDivElement>;

const FadeInImage: FC<{ isLoader?: boolean } & FadeInImageProps> = ({
  isLoader = true,
  alt,
  className,
  ...props
}) => {
  const { cx, classes } = useStyles();
  const [isLoading, toggleLoading] = useReducer((s) => !s, true);

  const onLoad: ReactEventHandler<HTMLDivElement> = (e) => {
    isLoader && toggleLoading();
    e.currentTarget.dataset.fadeIn = "true";
  };

  return (
    <Box mih={200} pos="relative">
      <Skeleton radius="sm" visible={isLoading} className={classes.skeleton} />
      <Image
        alt={alt}
        className={cx(classes.image, className)}
        onLoad={onLoad}
        {...props}
      />
    </Box>
  );
};
export default FadeInImage;
