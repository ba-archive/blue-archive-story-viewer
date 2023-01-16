import { RouteRecordRaw } from 'vue-router';
import { RouteMeta } from '../types/Routes';

export function flattenRouterRecords(
  routerRecords: RouteRecordRaw[]
): RouteRecordRaw[] {
  const res = [];
  for (const routerRecord of routerRecords) {
    if (routerRecord.children) {
      res.push(routerRecord);
      res.push(...flattenRouterRecords(routerRecord.children));
    } else {
      res.push(routerRecord);
    }
  }
  return res;
}

export function getMainRoutes(
  routerRecords: Array<RouteRecordRaw>
): Array<RouteRecordRaw> {
  return flattenRouterRecords(routerRecords)
    .filter(route => route.meta?.shouldShowInNav)
    .sort((a, b) => {
      return (a.meta?.navOrder as number) - (b.meta?.navOrder as number) || 0;
    });
}

export function getRouteTranslation(
  route: RouteRecordRaw,
  lang: string
): string {
  const routeMeta = route.meta as RouteMeta | undefined;
  if (routeMeta && routeMeta.m17n) {
    const m17n = routeMeta.m17n;
    if (m17n) {
      return (
        m17n.find(translation => lang === translation.lang)?.title ||
        (route.name as string)
      );
    }
  }
  return route.name as string;
}
