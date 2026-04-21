import { Bindings } from "./shared/types";
declare const app: import("hono/hono-base").HonoBase<{
    Bindings: Bindings;
}, ({
    "/": {
        $get: {
            input: {};
            output: "Ously API - Online";
            outputFormat: "text";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
} & {
    "/users": {
        $get: {
            input: {};
            output: {
                users: {
                    id: string;
                    email: string;
                    name: string | null;
                    emailVerified: boolean;
                    image: string | null;
                    createdAt: string;
                    updatedAt: string;
                }[];
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").ContentfulStatusCode;
        };
    };
}) | import("hono/types").MergeSchemaPath<import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<import("hono/types").BlankSchema, "/rest"> | import("hono/types").MergeSchemaPath<import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
    "/:id/project": {
        $post: {
            input: any;
            output: {
                error: string;
            };
            outputFormat: any;
            status: 404;
        } | {
            input: any;
            output: {
                snapshots: {
                    month: number;
                    date: string;
                    netWorth: number;
                    assets: number;
                    liabilities: number;
                    debtToAssetRatio: number;
                    entities: {
                        [x: string]: number;
                    };
                    isFrozen: boolean;
                }[];
            };
            outputFormat: any;
            status: import("hono/utils/http-status").ContentfulStatusCode;
        } | {
            input: any;
            output: {
                error: string;
            };
            outputFormat: any;
            status: 500;
        };
    };
}, "/"> | import("hono/types").MergeSchemaPath<{
    "/compare": {
        $post: {
            input: any;
            output: {
                branchA: {
                    id: string;
                    finalSnapshot?: {
                        month: number;
                        date: string;
                        netWorth: number;
                        assets: number;
                        liabilities: number;
                        debtToAssetRatio: number;
                        entities: {
                            [x: string]: number;
                        };
                        isFrozen: boolean;
                    } | undefined;
                };
                branchB: {
                    id: string;
                    finalSnapshot?: {
                        month: number;
                        date: string;
                        netWorth: number;
                        assets: number;
                        liabilities: number;
                        debtToAssetRatio: number;
                        entities: {
                            [x: string]: number;
                        };
                        isFrozen: boolean;
                    } | undefined;
                };
                diff: {
                    netWorth: number;
                    assets: number;
                    liabilities: number;
                };
            };
            outputFormat: any;
            status: import("hono/utils/http-status").ContentfulStatusCode;
        } | {
            input: any;
            output: {
                error: string;
            };
            outputFormat: any;
            status: 404;
        } | {
            input: any;
            output: {
                error: string;
            };
            outputFormat: any;
            status: 500;
        };
    };
}, "/">, "/rpc">, "/financial">, "/", "/users">;
export default app;
export type AppType = typeof app;
//# sourceMappingURL=index.d.ts.map