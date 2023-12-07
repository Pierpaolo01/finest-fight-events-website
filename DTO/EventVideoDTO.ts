import { EventDTO } from "./EventDTO";

export const EventVideoDTO = (video: any) => {
  const { id, attributes } = video;

  return {
    id: id as number,
    title: attributes.title as string,
    link: attributes.link as string,
    // event: EventDTO(attributes.event.data),
  };
};

export type EventVideoType = ReturnType<typeof EventVideoDTO>;
