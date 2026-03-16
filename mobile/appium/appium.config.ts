export interface NativeExecutionConfig {
  platformName: 'Android' | 'iOS';
  appiumServer: string;
  deviceName: string;
  appPath?: string;
}

export const nativeConfigs: NativeExecutionConfig[] = [
  {
    platformName: 'Android',
    appiumServer: 'http://127.0.0.1:4723',
    deviceName: 'Android Emulator'
  },
  {
    platformName: 'iOS',
    appiumServer: 'http://127.0.0.1:4723',
    deviceName: 'iPhone Simulator'
  }
];
