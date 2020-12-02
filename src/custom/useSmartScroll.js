const { useEffect } = require("react");

const useSmartScroll = (scrollRef) => {
  useEffect(() => {
    const node = scrollRef.current;
    node.scrollTop = node.scrollHeight;
  });
};
export default useSmartScroll;
