import { computed } from "vue";
import { dashboard } from "./dashboard";
import { table } from "./table";
import { tabs } from "./tabs";

export const items = [
    dashboard,
    table,
    tabs,
];

export const innerRouters = () => {
    let ret = []
    for (let i of items) {
        if ("subs" in i) {
            for (let ii of i.subs) {
                if ("subs" in ii) {
                    // nothing
                } else {
                    ret.push({
                        path: ii.index,
                        name: ii.index.substring(1),
                        meta: {
                            title: ii.title,
                        },
                        component: ii.component,
                    });
                }
            }

        } else {
            ret.push({
                path: i.index,
                name: i.index.substring(1),
                meta: {
                    title: i.title,
                },
                component: i.component,
            });
        }
    }
    return ret;
};