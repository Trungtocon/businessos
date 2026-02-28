// ERPNext Connector — Error Handling

export class ErpNextError extends Error {
    public readonly status: number;
    public readonly code: string;
    public readonly details?: unknown;

    constructor(message: string, status: number, code: string, details?: unknown) {
        super(message);
        this.name = "ErpNextError";
        this.status = status;
        this.code = code;
        this.details = details;
    }

    static fromResponse(status: number, body: unknown): ErpNextError {
        const msg =
            typeof body === "object" && body !== null && "exc" in body
                ? String((body as Record<string, unknown>).exc)
                : typeof body === "string"
                    ? body
                    : `ERPNext returned ${status}`;
        return new ErpNextError(msg, status, `ERP_HTTP_${status}`, body);
    }

    static network(err: unknown): ErpNextError {
        const msg = err instanceof Error ? err.message : String(err);
        return new ErpNextError(`Network error: ${msg}`, 0, "ERP_NETWORK", err);
    }

    static missingConfig(field: string): ErpNextError {
        return new ErpNextError(
            `Missing env: ${field}`,
            0,
            "ERP_CONFIG_MISSING"
        );
    }
}
