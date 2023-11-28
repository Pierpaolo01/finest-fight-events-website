export const MediaDTO = (data: any) => {
  if (!data || !data.attributes) {
    return null;
  }

  const { attributes, id } = data;

  return {
    id,
    url: attributes.url,
    caption: attributes.caption,
    alternativeText: attributes.alternativeText,
    mime: attributes.mime.split("/")[0] as "image" | "video",
  };
};

export type Media = ReturnType<typeof MediaDTO>;
