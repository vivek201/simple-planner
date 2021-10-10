import { Injectable } from "@angular/core";
import { GroupModel } from "../_models/group.model";
import { SettingsModel } from "../_models/settings.model";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  key = 'settings';
  settings: SettingsModel;

  constructor() {
    this.settings = this.getSettings();
  }

  get _localStorage(): Storage {
    return localStorage;
  }

  getSettings(): SettingsModel {
    if (this.settings) {
      return this.settings
    }
    const storageData = this._localStorage.getItem(this.key);
    if (storageData) {
      this.settings = JSON.parse(storageData);
    } else {
      this.settings = {
        autoSave: true,
        groups: []
      };
    }
    return this.settings;
  }

  saveSettings(settings: SettingsModel) {
    if (settings) {
      this._localStorage.setItem(this.key, JSON.stringify(settings));
      this.settings = settings;
    }
  }

  saveGroups(groups: GroupModel[]) {
    if (this.settings.autoSave) {
      this.settings.groups = groups;
      this.saveSettings(this.settings);
    }
  }
}