export type MapboxImage = {
  /**
   * The name of the image. This is the name that will be used to reference the image in the style.
   */
  name: string;
  /**
   * The URI of the image. This can be a local file path or a remote URL.
   */
  uri: string;

  /**
   * Whether the image is a sdf image.
   * SDF images can be tinted using the `iconColor` property of a SymbolLayer.
   * If false, the image will be rendered as is.
   * @default false
   */
  sdf: boolean;
};

export type MapboxImages = MapboxImage[];

export type ImagesProps = {
  images: MapboxImages;
};
