export type EssentialLinkProps = {
  title: string;
  caption?: string;
  link: string;
  external?: boolean;
  icon?: string;
};

export type Track = {
  title: string;
  slug: string;
  youtubeId: string;
  caption: string;
  coverImageUrl: string;
  detailedDescription: string;
};