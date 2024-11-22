import z from "zod";

export const CharacterSchema = z.object({
    value: z.string().length(1),
    type: z.enum(["symbol", "space"]),
    status: z.enum(["correct", "incorrect", "unknown"]),
});
export type Character = z.infer<typeof CharacterSchema>;
export type CharacterStatus = Character["status"];
export type CharacterValue = Character["value"];
export type CharacterType = Character["type"];
