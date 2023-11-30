import { EventFighterDTO } from "./EventFighterDTO";
import { EventTicketsDTO } from "./EventTicketsDTO";
import { LineupDTO } from "./LineupDTO";
import { MediaDTO } from "./MediaDTO";

export const EventDTO = (data: any[]) => {
  if (!data || !data.length) {
    return [];
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
      promo_assets: attributes.promo_assets?.data.map((asset: any) =>
        MediaDTO(asset)
      ),
      ticket_link: attributes.ticket_link,
      event_tickets: attributes.event_tickets?.data.map((ticket: any) =>
        EventTicketsDTO(ticket)
      ),
      event_fighters: attributes.event_fighters?.data.map((fighter: any) =>
        EventFighterDTO(fighter)
      ),
      gallery: attributes.gallery?.data?.map((asset: any) => MediaDTO(asset)),
      gallery_heading: attributes.gallery_heading,

      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
      publishedAt: attributes.publishedAt,
    };
  });
};

export const SingleEventDTO = (data: any) => {
  if (!data) {
    return null;
  }

  const { attributes, id } = data;

  return {
    id,
    name: attributes.name,
    date: attributes.date,
    location: attributes.location,
    teaser: attributes.teaser,
    heroImage: MediaDTO(attributes.hero_image?.data),
    lineups: attributes.lineups.data.map((lineup: any) => LineupDTO(lineup)),
    promo_assets: attributes.promo_assets?.data.map((asset: any) =>
      MediaDTO(asset)
    ),
    event_tickets: attributes.event_tickets?.data.map((ticket: any) =>
      EventTicketsDTO(ticket)
    ),
    ticket_link: attributes.ticket_link,
    event_fighters: attributes.event_fighters?.data.map((fighter: any) =>
      EventFighterDTO(fighter)
    ),
    gallery: attributes.gallery?.data?.map((asset: any) => MediaDTO(asset)),
    gallery_heading: attributes.gallery_heading,

    createdAt: attributes.createdAt,
    updatedAt: attributes.updatedAt,
    publishedAt: attributes.publishedAt,
  };
};

export type Event = ReturnType<typeof EventDTO>;
export type SingleEventDTOType = ReturnType<typeof SingleEventDTO>;
