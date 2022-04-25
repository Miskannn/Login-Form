import crypto from "crypto";

export class PasswordReminderService{
  static async createNewPassword (): Promise<string> {
    return crypto.randomBytes(6).toString("hex");
  }
}
