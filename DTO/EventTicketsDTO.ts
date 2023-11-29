export const EventTicketsDTO = (data: any) => {
  if (!data) {
    return null;
  }

  const { attributes, id } = data;

  return {
    id: id as number,
    ticket: attributes.ticket as string,
    price: attributes.price as number,
  };
};

export type EventTicketsDTOType = ReturnType<typeof EventTicketsDTO>;
