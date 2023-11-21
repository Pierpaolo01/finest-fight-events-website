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
    }
}

export type Media = ReturnType<typeof MediaDTO>;
