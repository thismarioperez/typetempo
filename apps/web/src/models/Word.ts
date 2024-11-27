import z from "zod";

export const CharacterSchema = z.object({
    id: z.string(),
    value: z.string().length(1),
    type: z.enum(["symbol", "space"]),
    status: z.enum(["correct", "incorrect", "unknown"]),
});
export type Character = z.infer<typeof CharacterSchema>;
export type CharacterId = Character["id"];
export type CharacterStatus = Character["status"];
export type CharacterValue = Character["value"];
export type CharacterType = Character["type"];
