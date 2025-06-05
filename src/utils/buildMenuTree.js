// src/utils/buildMenuTree.js
export function buildMenuTree(menuItems) {
  const menuMap = {};
  const rootMenus = [];

  menuItems.forEach((item) => {
    item.children = [];
    menuMap[item.id] = item;
  });

  menuItems.forEach((item) => {
    if (item.padre_id === null) {
      rootMenus.push(item);
    } else if (menuMap[item.padre_id]) {
      menuMap[item.padre_id].children.push(item);
    }
  });

  return rootMenus.sort((a, b) => a.orden - b.orden);
}
