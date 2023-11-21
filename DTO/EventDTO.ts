import { LineupDTO } from "./LineupDTO";
import { MediaDTO } from "./MediaDTO";

export const EventDTO = (data: any[]) => {
    if (!data || !data.length) {
        return null;
    }

    return data.map((event: any) => {
        const { attributes, id } = event;

        return {
            id,
            name: attributes.name,
            date: attributes.date,
            location: attributes.location,
            teaser: attributes.teaser,
            heroImage: MediaDTO(attributes.hero_image?.data),
            lineups: attributes.lineups.data.map((lineup: any) => LineupDTO(lineup)),
    
            createdAt: attributes.createdAt,
            updatedAt: attributes.updatedAt,
            publishedAt: attributes.publishedAt,
        };
    });
}

export type Event = ReturnType<typeof EventDTO>;
