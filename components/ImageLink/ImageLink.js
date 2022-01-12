import Link from "next/link";
import Image from "next/image";
import styles from "./ImageLink.module.css";
const ImageLink = ({ path, src, href, height, width, layout, alt }) => {
  let image = (
    <Image
      src={src}
      width={width}
      height={height}
      layout={layout ? layout : "intrinsic"}
      alt={alt}
    />
  );
  if (!path) {
    image = (
      <Image
        src={"https://plchldr.co/i/370x556?&bg=252525&fc=ccc&text=broken!"}
        width={width}
        height={height}
        alt="broken image"
      />
    );
  }
  return href ? (
    <Link href={href}>
      <a className={styles.container}>{image}</a>
    </Link>
  ) : (
    image
  );
};

export default ImageLink;
