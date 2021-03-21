import { computed, CSSProperties } from 'vue';

const useCustomStyle = (position: any, offset: any, showIcon: boolean) => {
  const customStyle = computed(() => {
    switch (position) {
      case "top-left":
        return {
          left: "0",
          top: `${offset}px`,
        };
      case "bottom-left":
        return {
          left: "0",
          bottom: `${offset}px`,
        };
      case "bottom-right":
        return {
          right: "0",
          bottom: `${offset}px`,
        };
      case "top-center":
        return {
          top: `${offset}px`,
          left: "0",
          right: "0",
          marginRight: "auto",
          marginLeft: "auto",
        };
      case "bottom-center":
        return {
          bottom: `${offset}px`,
          left: "0",
          right: "0",
          marginRight: "auto",
          marginLeft: "auto",
        };
      default:
        return {
          right: "0",
          top: `${offset}px`,
        };
    }
  });
  if (!showIcon) {
    ((customStyle.value) as CSSProperties).padding = '12px 16px'
  }
  return {customStyle}
}

export default useCustomStyle