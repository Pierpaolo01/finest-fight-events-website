export const EventFighterDTO = (data: any) => {
  if (!data) {
    return null;
  }

  const { attributes, id } = data;

  return {
    id: id as number,
    name: attributes.fighter_name as string,
  };
};

export type EventFighterDTO = ReturnType<typeof EventFighterDTO>;
