export type ThemeMode = 'light' | 'dark' | 'system';

export class ThemeManager {
  private currentTheme: ThemeMode;

  constructor(initialTheme: ThemeMode = 'system') {
    this.currentTheme = initialTheme;
  }

  public getEffectiveTheme(systemPrefersDark: boolean): 'light' | 'dark' {
    if (this.currentTheme === 'system') {
      return systemPrefersDark ? 'dark' : 'light';
    }
    return this.currentTheme;
  }

  public setTheme(theme: ThemeMode): void {
    this.currentTheme = theme;
  }

  public getTheme(): ThemeMode {
    return this.currentTheme;
  }
}