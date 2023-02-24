import { Box, createStyles, Image, ImageProps } from "@mantine/core";
import { FC, ReactEventHandler } from "react";

const useStyles = createStyles((theme) => ({
  image: {
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
    "&[data-fade-in='true']": {
      opacity: "1 !important",
    },
  },
}));

type FadeInImageProps = ImageProps & React.RefAttributes<HTMLDivElement>;

const FadeInImage: FC<{ mih?: number } & FadeInImageProps> = ({
  mih,
  alt,
  className,
  ...props
}) => {
  const { cx, classes } = useStyles();

  const onLoad: ReactEventHandler<HTMLDivElement> = (e) =>
    (e.currentTarget.dataset.fadeIn = "true");

  return (
    <Box mih={mih} pos="relative">
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
