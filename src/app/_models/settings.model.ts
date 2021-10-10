import { GroupModel } from "./group.model";

export interface SettingsModel {
  autoSave: boolean;
  groups: GroupModel[];
}