import { UserSettings, UserSettingsResponse } from "@typetempo/models";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "src/middleware/auth.middleware";
import { UserSettingsService } from "src/services/user-settings.service";
import { HttpException } from "src/utils/exceptions";

export class UserSettingsController {
    private userSettingsService: UserSettingsService;

    constructor() {
        this.userSettingsService = new UserSettingsService();
    }

    getUserSettings = async (req: AuthRequest, res: Response<UserSettingsResponse>, next: NextFunction) => {
        try {
            const userId = (req.userId && parseInt(req.userId)) || null;

            if (!userId) {
                throw new HttpException(401, "User not authenticated");
            }

            const userSettings = await this.userSettingsService.findUserSettingsByUserId(userId);

            if (!userSettings) {
                throw new HttpException(404, "User settings not found");
            }

            res.status(200).json({
                message: "User settings retrieved",
                userSettings: {
                    theme: userSettings.theme,
                    language: userSettings.language,
                    wordLimit: userSettings.wordLimit,
                },
            });
        } catch (error) {
            next(error);
        }
    };

    updateUserSettings = async (
        req: AuthRequest & Request<unknown, unknown, UserSettings>,
        res: Response<UserSettingsResponse>,
        next: NextFunction,
    ) => {
        try {
            const userId = (req.userId && parseInt(req.userId)) || null;

            if (!userId) {
                throw new HttpException(401, "User not authenticated");
            }

            const userSettings: UserSettings = req.body;

            const updatedUserSettings = await this.userSettingsService.updateUserSettingsByUserId(userId, userSettings);

            res.status(200).json({
                message: "User settings updated",
                userSettings: {
                    theme: updatedUserSettings.theme,
                    language: updatedUserSettings.language,
                    wordLimit: updatedUserSettings.wordLimit,
                },
            });
        } catch (error) {
            next(error);
        }
    };
}
