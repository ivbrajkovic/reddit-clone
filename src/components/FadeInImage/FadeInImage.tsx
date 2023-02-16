import { createStyles, Image, ImageProps } from "@mantine/core";
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

const handleLoadImage: ReactEventHandler<HTMLImageElement> = (e) =>
  (e.currentTarget.dataset.fadeIn = "true");

type FadeInImageProps = ImageProps & React.RefAttributes<HTMLDivElement>;

const FadeInImage: FC<FadeInImageProps> = ({ alt, className, ...props }) => {
  const { cx, classes } = useStyles();
  return (
    <Image
      alt={alt}
      onLoad={handleLoadImage}
      className={cx(classes.image, className)}
      {...props}
    />
  );
};
export default FadeInImage;
