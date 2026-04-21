import { Hono } from "hono";
import { Bindings } from "../../shared/types";
export declare const restRouter: Hono<{
    Bindings: Bindings;
}, import("hono/types").BlankSchema, "/">;
export declare const rpcRouter: import("hono/hono-base").HonoBase<{
    Bindings: Bindings;
}, import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
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
}, "/">, "/", "/">;
export declare const financialRouter: import("hono/hono-base").HonoBase<{
    Bindings: Bindings;
}, import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<import("hono/types").BlankSchema, "/rest"> | import("hono/types").MergeSchemaPath<import("hono/types").BlankSchema | import("hono/types").MergeSchemaPath<{
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
}, "/">, "/rpc">, "/", "/">;
export type FinancialRpcType = typeof rpcRouter;
//# sourceMappingURL=index.d.ts.map