import StorageType from "../types/Storage";

export default (): StorageType => {
  const keys = ["school_id", "office_code"];

  chrome.storage.sync.get(keys, (items) => {
    return items;
  });
  return {};
};
