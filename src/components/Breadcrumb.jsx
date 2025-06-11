import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "/src/auth/AuthContext";

function Breadcrumb() {
    const { usuario } = useAuth();
    const location = useLocation();

    if (!usuario) return null; // Si no hay usuario, no mostrar breadcrumb

    const pathname = location.pathname;
    const pathSegments = pathname.split("/").filter(seg => seg);

    const findMenuByRuta = (ruta, menus) => {
        for (const menu of menus) {
            if (menu.ruta === ruta) return menu;
            if (menu.submenus) {
                const foundSub = findMenuByRuta(ruta, menu.submenus);
                if (foundSub) return foundSub;
            }
        }
        return null;
    };

    const crumbs = [];
    let accumulatedPath = "";

    pathSegments.forEach((seg) => {
        accumulatedPath += "/" + seg;
        const menu = findMenuByRuta(accumulatedPath, usuario.menus);
        crumbs.push({
            nombre: menu ? menu.nombre : seg,
            ruta: accumulatedPath,
            padre_id: menu ? menu.padre_id : null, // guardo padre_id para la lógica
        });
    });

    // Si no hay crumbs, ponemos Inicio
    if (crumbs.length === 0) {
        crumbs.push({
            nombre: "Inicio",
            ruta: "/",
            padre_id: null,
        });
    }

    return (
        <nav aria-label="breadcrumb" style={{ marginBottom: "1rem" }}>
            {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                const isRootLevel = crumb.padre_id === null;

                return (
                    <span key={crumb.ruta}>
                        {!isLast && !isRootLevel ? (
                            <Link to={crumb.ruta}>{crumb.nombre}</Link>
                        ) : (
                            <span>{crumb.nombre}</span>
                        )}
                        {!isLast && " / "}
                    </span>
                );
            })}
        </nav>
    );

}

export default Breadcrumb;
