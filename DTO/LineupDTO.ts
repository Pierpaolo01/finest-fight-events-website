import { MediaDTO } from "./MediaDTO";

export const LineupDTO = (data: any) => {
    if (!data || !data.attributes) {
        return null;
    }

    const { attributes, id } = data;

    return {
        id,
        lineupName: attributes.lineup_name,
        fighterAName: attributes.fighter_a_name,
        fighterANickname: attributes.fighter_a_nickname,
        fighterACover: MediaDTO(attributes.fighter_a_cover.data),
        fighterBName: attributes.fighter_b_name,
        fighterBNickname: attributes.fighter_b_nickname,
        fighterBCover: MediaDTO(attributes.fighter_b_cover.data),
    }
}

export type Lineup = ReturnType<typeof LineupDTO>;
