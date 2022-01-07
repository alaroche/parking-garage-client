export default function themeableClassName(className, theme) {
  return `${className} ${className}--${theme.className}`;
}