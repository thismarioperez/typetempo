import { prisma } from "@typetempo/db/src/client";
import { UserSettings } from "@typetempo/models";
import { HttpException } from "src/utils/exceptions";

export class UserSettingsService {
    async findUserSettingsByUserId(userId: number): Promise<UserSettings | undefined> {
        const userSettings = await prisma.userSettings.findUnique({ where: { userId } });

        if (userSettings) {
            return userSettings;
        }

        return new Promise<undefined>((resolve) => resolve(undefined));
    }

    async updateUserSettingsByUserId(userId: number, userSettings: UserSettings): Promise<UserSettings> {
        const updatedSettings = await prisma.userSettings.update({
            where: { userId },
            data: userSettings,
        });

        if (updatedSettings) {
            return updatedSettings;
        }

        throw new HttpException(500, "Failed to update user settings");
    }
}
