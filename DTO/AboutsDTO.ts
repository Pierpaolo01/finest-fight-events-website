import { MediaDTO } from "./MediaDTO";

export const AboutDTO = (data: any[]) => {
    if (!data || !data.length) {
        return null;
    }

    return data.map((about: any) => {
        const { attributes, id } = about;

        return {
            id,
            title: attributes.title,
            description: attributes.description,
            image: MediaDTO(attributes.image.data),
            // createdAt: attributes.createdAt,
            // updatedAt: attributes.updatedAt,
            // publishedAt: attributes.publishedAt,
        };
    });
}

export type About = ReturnType<typeof AboutDTO>;
