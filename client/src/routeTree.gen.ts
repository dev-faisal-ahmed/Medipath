/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router';

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as LoginImport } from './routes/login';
import { Route as PrivateImport } from './routes/_private';

// Create Virtual Routes

const PrivateIndexLazyImport = createFileRoute('/_private/')();

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any);

const PrivateRoute = PrivateImport.update({
  id: '/_private',
  getParentRoute: () => rootRoute,
} as any);

const PrivateIndexLazyRoute = PrivateIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => PrivateRoute,
} as any).lazy(() => import('./routes/_private/index.lazy').then((d) => d.Route));

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_private': {
      id: '/_private';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof PrivateImport;
      parentRoute: typeof rootRoute;
    };
    '/login': {
      id: '/login';
      path: '/login';
      fullPath: '/login';
      preLoaderRoute: typeof LoginImport;
      parentRoute: typeof rootRoute;
    };
    '/_private/': {
      id: '/_private/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof PrivateIndexLazyImport;
      parentRoute: typeof PrivateImport;
    };
  }
}

// Create and export the route tree

interface PrivateRouteChildren {
  PrivateIndexLazyRoute: typeof PrivateIndexLazyRoute;
}

const PrivateRouteChildren: PrivateRouteChildren = {
  PrivateIndexLazyRoute: PrivateIndexLazyRoute,
};

const PrivateRouteWithChildren = PrivateRoute._addFileChildren(PrivateRouteChildren);

export interface FileRoutesByFullPath {
  '': typeof PrivateRouteWithChildren;
  '/login': typeof LoginRoute;
  '/': typeof PrivateIndexLazyRoute;
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute;
  '/': typeof PrivateIndexLazyRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/_private': typeof PrivateRouteWithChildren;
  '/login': typeof LoginRoute;
  '/_private/': typeof PrivateIndexLazyRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: '' | '/login' | '/';
  fileRoutesByTo: FileRoutesByTo;
  to: '/login' | '/';
  id: '__root__' | '/_private' | '/login' | '/_private/';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  PrivateRoute: typeof PrivateRouteWithChildren;
  LoginRoute: typeof LoginRoute;
}

const rootRouteChildren: RootRouteChildren = {
  PrivateRoute: PrivateRouteWithChildren,
  LoginRoute: LoginRoute,
};

export const routeTree = rootRoute._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_private",
        "/login"
      ]
    },
    "/_private": {
      "filePath": "_private.tsx",
      "children": [
        "/_private/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_private/": {
      "filePath": "_private/index.lazy.tsx",
      "parent": "/_private"
    }
  }
}
ROUTE_MANIFEST_END */
