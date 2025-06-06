export function buildMenuTree(menuItems) {
  const menuMap = {};
  const rootMenus = [];

  // Inicializar estructura
  menuItems.forEach((item) => {
    item.children = [];
    menuMap[item.id] = item;
  });

  // Construir jerarquía
  menuItems.forEach((item) => {
    if (item.padre_id === null) {
      rootMenus.push(item);
    } else if (menuMap[item.padre_id]) {
      menuMap[item.padre_id].children.push(item);
    }
  });

  // Ordenar recursivamente por "orden"
  function sortMenus(menus) {
    menus.sort((a, b) => a.orden - b.orden);
    menus.forEach((menu) => {
      if (menu.children && menu.children.length > 0) {
        sortMenus(menu.children);
      }
    });
  }

  sortMenus(rootMenus);
  return rootMenus;
}
