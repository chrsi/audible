export const TARGET = {
  WINDOW: 'window',
  INJECT: 'inject',
};

export function getConfigurationTarget(target) {
  switch (target) {
    case 'inject':
      return 'inject';
    default:
      return 'window';
  }
}
