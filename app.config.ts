export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool',
    error: 'error',
    button: {
      default: {
        size: 'md',
      },
    },
    input: {
      default: {
        size: 'md',
      },
    },
    select: {
      default: {
        size: 'md',
      },
    },
    badge: {
      default: {
        size: 'md',
      },
    },
    avatar: {
      background: 'bg-white dark:bg-gray-900',
      size: {
        '4xl': 'w-[140px] h-[140px] text-4xl',
      },
      icon: {
        '4xl': 'w-[100px] h-[100px]',
      },
    },
    pagination: {
      wrapper: 'items-stretch',
    },
  },
});
